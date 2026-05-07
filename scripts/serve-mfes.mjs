import http from "node:http";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import config from "./mfe-server.config.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const server = express();

function absolutePath(relativePath) {
  return path.resolve(rootDir, relativePath);
}

function proxyApi(proxyTarget) {
  const target = new URL(proxyTarget);
  const client = target.protocol === "https:" ? https : http;

  return (req, res) => {
    const proxyUrl = new URL(req.originalUrl, target);
    const proxyReq = client.request(
      proxyUrl,
      {
        method: req.method,
        headers: {
          ...req.headers,
          host: target.host,
        },
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode ?? 502, proxyRes.headers);
        proxyRes.pipe(res);
      },
    );

    proxyReq.on("error", (error) => {
      console.error(`API proxy failed: ${error.message}`);
      if (!res.headersSent) {
        res.status(502).send("API proxy failed.");
      } else {
        res.end();
      }
    });

    req.pipe(proxyReq);
  };
}

function serveSpa({ route, dir }) {
  const appDir = absolutePath(dir);
  const indexPath = path.join(appDir, "index.html");

  if (route !== "/") {
    server.use((req, res, next) => {
      if ((req.method === "GET" || req.method === "HEAD") && req.path === route) {
        res.redirect(301, `${route}/`);
        return;
      }

      next();
    });
  }

  server.use(route, express.static(appDir, { index: false }));
  server.use(route, (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    res.sendFile(indexPath);
  });
}

if (config.apiProxy) {
  server.use("/api", proxyApi(config.apiProxy));
}

for (const appConfig of config.apps) {
  serveSpa(appConfig);
}

const listener = server.listen(config.port, config.host, () => {
  console.log(`MFE server running at http://${config.host}:${config.port}`);
  for (const appConfig of config.apps) {
    console.log(`${appConfig.route} -> ${appConfig.dir}`);
  }
});

listener.on("error", (error) => {
  console.error(`MFE server failed to start: ${error.message}`);
  process.exitCode = 1;
});

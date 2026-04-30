import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

export function reactRsbuildConfig({ dirname = process.cwd(), plugins = [], alias = {}, server = {}, other = {} } = {}) {
  const apiTarget = process.env.COMMERCEOS_API_URL ?? "http://localhost:3001";

  return defineConfig({
    plugins: [pluginReact(), ...plugins],
    source: {
      entry: {
        index: path.resolve(dirname, "./src/main.tsx"),
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(dirname, "./src"),
        ...alias,
      },
    },
    html: {
      template: path.resolve(dirname, "./index.html"),
    },
    server: {
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
        },
      },
      ...server,
    },
    tools: {
      postcss: {
        postcssOptions: {
          plugins: [tailwindcss()],
        },
      },
      rspack(config) {
        config.module ??= {};
        config.module.parser ??= {};
        config.module.parser.javascript = {
          ...config.module.parser.javascript,
          exportsPresence: false,
        };
        return config;
      },
    },
    ...other,
  });
}

export function dirnameFromMetaUrl(metaUrl) {
  return path.dirname(fileURLToPath(metaUrl));
}

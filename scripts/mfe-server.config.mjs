export default {
  port: 8080,
  host: "127.0.0.1",
  apiProxy: "http://localhost:3001",
  apps: [
    { route: "/customers", dir: "apps/customers/dist" },
    { route: "/", dir: "apps/app-shell/dist" },
  ],
};

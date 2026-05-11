import { createRsbuildConfig } from "@commerceos/tooling/rsbuild";

export default createRsbuildConfig({
  port: 3000,
  analyticsProxyTarget: "http://localhost:3001",
  dashboardProxyTarget: "http://localhost:3005",
});

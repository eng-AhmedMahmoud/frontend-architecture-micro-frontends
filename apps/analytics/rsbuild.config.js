import { createRsbuildConfig } from "@commerceos/tooling/rsbuild";

export default createRsbuildConfig({
  port: 3001,
  assetPrefix: "/analytics/",
  devAssetPrefix: "/analytics",
  serverBase: "/",
});

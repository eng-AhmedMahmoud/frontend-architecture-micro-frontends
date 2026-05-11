import { createRsbuildConfig } from "@commerceos/tooling/rsbuild";

export default createRsbuildConfig({
  port: 3005,
  assetPrefix: "/dashboard/",
  devAssetPrefix: "/dashboard",
  serverBase: "/",
});

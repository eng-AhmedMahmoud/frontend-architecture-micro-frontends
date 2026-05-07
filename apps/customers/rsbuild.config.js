import { dirnameFromMetaUrl, reactRsbuildConfig } from "@commerceos/tooling/rsbuild/react";

export default reactRsbuildConfig({
  dirname: dirnameFromMetaUrl(import.meta.url),
  server: {
    base: "/customers",
    port: Number(process.env.TURBO_MFE_PORT ?? 3002),
  },
  dev: {
    assetPrefix: "/customers/",
  },
  other: {
    output: {
      assetPrefix: "/customers/",
    },
  },
});

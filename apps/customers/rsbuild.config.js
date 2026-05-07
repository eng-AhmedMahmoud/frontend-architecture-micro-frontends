import { dirnameFromMetaUrl, reactRsbuildConfig } from "@commerceos/tooling/rsbuild/react";

export default reactRsbuildConfig({
  dirname: dirnameFromMetaUrl(import.meta.url),
  other: {
    output: {
      assetPrefix: "/customers/",
    },
  },
});

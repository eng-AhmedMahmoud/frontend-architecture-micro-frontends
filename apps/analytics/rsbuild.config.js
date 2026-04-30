import { dirnameFromMetaUrl, reactRsbuildConfig } from "@commerceos/tooling/rsbuild/react";

const shared = {
  react: { singleton: true, eager: true, requiredVersion: false },
  "react-dom": { singleton: true, eager: true, requiredVersion: false },
  "@tanstack/react-query": { singleton: true, eager: true, requiredVersion: false },
  "@commerceos/shared": { singleton: true, eager: true, requiredVersion: false },
  "@commerceos/ui": { singleton: true, eager: true, requiredVersion: false },
};

export default reactRsbuildConfig({
  dirname: dirnameFromMetaUrl(import.meta.url),
  server: {
    port: 3002,
  },
  moduleFederation: {
    options: {
      name: "analytics",
      filename: "remoteEntry.js",
      exposes: {
        "./AnalyticsScreen": "./src/screens/analytics-screen.tsx",
      },
      shared,
    },
  },
});

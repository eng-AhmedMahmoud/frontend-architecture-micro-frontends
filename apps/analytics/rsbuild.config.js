import { createRsbuildConfig } from "@commerceos/tooling/rsbuild";

export default createRsbuildConfig({
  port: 3001,
  moduleFederation: {
    name: "analytics",
    filename: "remoteEntry.js",
    exposes: {
      "./index.screen": "./src/screens/analytics.index.tsx",
    },
    shared: {
      react: { singleton: true },
      "react-dom": { singleton: true },
      "@tanstack/react-query": { singleton: true }
    },
  },
});

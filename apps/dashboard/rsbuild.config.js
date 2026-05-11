import { createRsbuildConfig } from "@commerceos/tooling/rsbuild";

export default createRsbuildConfig({
  port: 3005,
  moduleFederation: {
    name: "appShell",
    remotes: {
      analytics: "analytics@http://localhost:3001/remoteEntry.js",
    },
    shared: {
      react: { singleton: true, eager: true },
      "react-dom": { singleton: true, eager: true },
      "@tanstack/react-query": { singleton: true, eager: true }
    },
  },
});

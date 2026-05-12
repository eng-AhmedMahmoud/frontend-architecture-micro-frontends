import { createRsbuildConfig } from "@commerceos/tooling/rsbuild";

export default createRsbuildConfig({
  port: 3001,
  moduleFederation: {
    name: "analytics",
    filename: "remoteEntry.js",
    exposes: {
      "./index.screen": "./src/screens/analytics.index.tsx",
      "./order-status-distribution-chart": "./src/features/analytics-overview/components/order-status-distribution-chart.tsx",
      "./count.state": "./src/stores/count.state.ts",
      "./count.listener": "./src/stores/count.listener.ts",
    },
    shared: {
      react: { singleton: true, import: false },
      "react-dom": { singleton: true, import: false },
      "@tanstack/react-query": { singleton: true, import: false }
    },
  },
});

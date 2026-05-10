import { createRsbuildConfig } from "@commerceos/tooling/rsbuild";

export default createRsbuildConfig({
  port: 3001,
  moduleFederation: {
    name: "analytics",
    filename: "remoteEntry.js",
    exposes: {
      "./index.screen": "./src/screens/analytics.index.tsx",
      "./order-status-distribution-chart": "./src/features/analytics-overview/components/order-status-distribution-chart.tsx",
    },
    shared: {
      react: { singleton: true, import: false },
      "react-dom": { singleton: true, import: false },
      "@tanstack/react-query": { singleton: true, import: false }
    },
  },
});

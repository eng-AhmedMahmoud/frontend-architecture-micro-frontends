import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@commerceos/authentication/providers/auth-provider";
import { AppProviders } from "@commerceos/shared/providers/app-providers";
import { createStandaloneRouter } from "@commerceos/shared/router/standalone";
import AnalyticsPage from "@commerceos/analytics/screens/analytics.index";
import { AnalyticsAppShell } from "./app/shell/analytics-app-shell";
import "@commerceos/shared/styles/globals.css";

function AnalyticsShellRoute() {
  return (
    <AnalyticsAppShell>
      <AnalyticsPage />
    </AnalyticsAppShell>
  );
}

function BareStandaloneRoot() {
  return <Outlet />;
}

const router = createStandaloneRouter(
  [
    { path: "/", component: AnalyticsShellRoute },
    { path: "/analytics", component: AnalyticsShellRoute },
  ],
  { rootComponent: BareStandaloneRoot },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProviders>
  </React.StrictMode>,
);

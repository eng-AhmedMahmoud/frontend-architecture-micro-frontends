import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { AppProviders } from "@commerceos/shared/providers/AppProviders";
import { AppFrame } from "@commerceos/shell";
import "@commerceos/ui/styles.css";
import { CustomerDetailScreen } from "./screens/customer-detail-screen";
import { CustomersScreen } from "./screens/customers-screen";

const rootRoute = createRootRoute({
  component: () => (
    <AppFrame pathname={window.location.pathname}>
      <Outlet />
    </AppFrame>
  ),
});

const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers",
  component: CustomersScreen,
});

const customerDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers/$customerId",
  component: CustomerDetailScreen,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([customersRoute, customerDetailRoute]),
  defaultPreload: "intent",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>,
);

import { Navigate, Outlet, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@commerceos/shared/providers/use-auth";
import { LoadingState } from "@commerceos/shared/feedback/loading-state";
import { AppFrame } from "@commerceos/shell";
import { CommandMenu } from "@commerceos/search";
import { getViewPermissionForPath } from "@commerceos/shared/lib/auth";

export function RootComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { isLoading, isAuthenticated, hasPermission, getFallbackPath } = useAuth();

  if (isLoading) {
    return <LoadingState label="Loading account session..." />;
  }

  if (!isAuthenticated) {
    return pathname === "/login" ? <Outlet /> : <Navigate to="/login" />;
  }

  if (pathname === "/login") {
    return <Navigate to={getFallbackPath()} />;
  }

  const requiredPermission = getViewPermissionForPath(pathname);
  if (!hasPermission(requiredPermission)) {
    return <Navigate to={getFallbackPath()} />;
  }

  return (
    <AppFrame
      pathname={pathname}
      commandMenu={({ open, onOpenChange }) => <CommandMenu open={open} onOpenChange={onOpenChange} />}
    >
      <Outlet />
    </AppFrame>
  );
}

export function NotFoundComponent() {
  return <div className="rounded-lg border bg-card p-8">Page not found.</div>;
}

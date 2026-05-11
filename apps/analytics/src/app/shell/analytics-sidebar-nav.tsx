import { AppShellSidebarNav } from "@commerceos/shared/components/app-shell-sidebar-nav";

export function AnalyticsSidebarNav() {
  return (
    <AppShellSidebarNav
      isExternalNav={(to) => to !== "/analytics"}
      isPathActive={(pathname, to) => (
        to === "/analytics"
          ? pathname === "/analytics" || pathname === "/analytics/"
          : pathname === to || (to !== "/" && pathname.startsWith(to))
      )}
      profileExternalNavigation
    />
  );
}

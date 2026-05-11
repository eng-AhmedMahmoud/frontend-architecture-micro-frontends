import { AppShellSidebarNav } from "@commerceos/shared/components/app-shell-sidebar-nav";

export function SidebarNav() {
  return <AppShellSidebarNav isExternalNav={(to) => to === "/analytics"} />;
}

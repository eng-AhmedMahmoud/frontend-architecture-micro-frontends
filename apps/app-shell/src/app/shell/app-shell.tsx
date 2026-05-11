import { type ReactNode, useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAuth } from "@commerceos/authentication/providers/use-auth";
import { CommandMenu } from "./command-menu";
import { SidebarNav } from "./sidebar-nav";
import { AppShellLayout } from "@commerceos/shared/components/app-shell-layout";
import { appShellNavItems } from "@commerceos/shared/lib/app-shell-nav";
import { Select } from "@commerceos/ui/select";
import { ROLE_LABELS } from "@commerceos/shared/permissions/permissions";

function getPageTitle(pathname: string) {
  if (pathname === "/") return "Dashboard";
  const matched = appShellNavItems.find((item) => item.to !== "/" && pathname.startsWith(item.to));
  return matched?.label ?? "CommerceOS Admin";
}

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const { session, switchAccount } = useAuth();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandMenuOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AppShellLayout
      commandMenu={<CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} />}
      sidebar={<SidebarNav />}
      pageTitle={getPageTitle(pathname)}
      accountSwitcher={
        session ? (
          <div className="hidden min-w-[220px] lg:block">
            <Select
              value={session.activeAccount.id}
              onChange={(event) => void switchAccount(event.target.value)}
              aria-label="Active account"
            >
              {session.memberships.map((membership) => (
                <option key={membership.account.id} value={membership.account.id}>
                  {membership.account.name} · {ROLE_LABELS[membership.role]}
                </option>
              ))}
            </Select>
          </div>
        ) : null
      }
      onOpenCommandMenu={() => setCommandMenuOpen(true)}
    >
      {children}
    </AppShellLayout>
  );
}

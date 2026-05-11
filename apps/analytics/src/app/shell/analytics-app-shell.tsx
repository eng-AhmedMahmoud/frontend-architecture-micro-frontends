import type { ReactNode } from "react";
import { useAuth } from "@commerceos/authentication/providers/use-auth";
import { AppShellLayout } from "@commerceos/shared/components/app-shell-layout";
import { ROLE_LABELS } from "@commerceos/shared/permissions/permissions";
import { Select } from "@commerceos/ui/select";
import { AnalyticsSidebarNav } from "./analytics-sidebar-nav";

interface AnalyticsAppShellProps {
  children: ReactNode;
}

export function AnalyticsAppShell({ children }: AnalyticsAppShellProps) {
  const { session, switchAccount } = useAuth();

  return (
    <AppShellLayout
      pageTitle="Analytics"
      sidebar={<AnalyticsSidebarNav />}
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
    >
      {children}
    </AppShellLayout>
  );
}

import { type ReactNode } from "react";
import { Command, Menu, Search } from "lucide-react";
import { ThemeToggle } from "@commerceos/shared/components/theme/theme-toggle";
import { Button } from "@commerceos/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@commerceos/ui/sheet";

interface AppShellLayoutProps {
  children: ReactNode;
  pageTitle: string;
  commandMenu?: ReactNode;
  sidebar: ReactNode;
  accountSwitcher?: ReactNode;
  onOpenCommandMenu?: () => void;
}

export function AppShellLayout({
  children,
  pageTitle,
  commandMenu,
  sidebar,
  accountSwitcher,
  onOpenCommandMenu,
}: AppShellLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      {commandMenu}
      <div className="flex h-full">
        <aside className="hidden h-full w-72 overflow-y-auto border-r bg-card p-4 lg:block">
          {sidebar}
        </aside>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="lg:hidden">
                  {sidebar}
                </SheetContent>
              </Sheet>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground">CommerceOS Admin</div>
                <div className="truncate text-lg font-semibold">{pageTitle}</div>
              </div>
              {accountSwitcher}
              <ThemeToggle />
              {onOpenCommandMenu ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onOpenCommandMenu}
                  className="hidden w-full max-w-sm items-center justify-between gap-3 md:flex"
                >
                  <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                    <span className="truncate">Search, jump, or run a command...</span>
                  </span>
                  <span className="flex items-center gap-1 rounded-md border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                    <Command className="h-3 w-3" />
                    <span>K</span>
                  </span>
                </Button>
              ) : null}
            </div>
          </header>
          <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

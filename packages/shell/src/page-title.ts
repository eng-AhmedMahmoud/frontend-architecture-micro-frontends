import { navItems } from "./nav-items";

export function getPageTitle(pathname: string) {
  if (pathname === "/") return "Dashboard";
  const matched = navItems.find((item) => item.to !== "/" && pathname.startsWith(item.to));
  return matched?.label ?? "CommerceOS Admin";
}

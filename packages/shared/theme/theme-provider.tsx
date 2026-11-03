import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import { ThemeContext, type Theme, type ThemeContextValue } from "@commerceos/shared/theme/theme-context";

const THEME_STORAGE_KEY = "commerceos-theme";
const DEFAULT_THEME: Theme = "light";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;

  // Anything other than light/dark (including "system" saved by older builds) falls back to the default.
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (nextTheme) => {
        setThemeState(nextTheme);
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

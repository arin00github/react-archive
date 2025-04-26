import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const savedTheme = localStorage.getItem("theme") as ThemeMode | null;

  if (savedTheme) {
    return savedTheme;
  }

  const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`);

  return prefersDark ? "dark" : "light";
}

export function useThemeMode() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { themeMode, toggleTheme };
}

// function usePrefersDarkMode() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia(`(prefers-color-scheme: dark)`);

//     setIsDarkMode(mediaQuery.matches);

//     const handler = (event: MediaQueryListEvent) => {
//       setIsDarkMode(event.matches);
//     };

//     mediaQuery.addEventListener("change", handler);

//     return () => {
//       mediaQuery.removeEventListener("change", handler);
//     };
//   }, []);
//   return isDarkMode;
// }

// export default usePrefersDarkMode;

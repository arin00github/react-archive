"use client";

import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes"; // ✅ 여기
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import darkTheme from "@/styles/darkTheme";
import lightTheme from "@/styles/lightTheme";

import { ChildrenWrapper } from "@/interfaces/common";
// import { useThemeMode } from "@/hooks/useThemeMode";

export const StyledThemeProvider = ({ children }: ChildrenWrapper) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </NextThemesProvider>
  );
};

const ThemeProviderWrapper = ({ children }: ChildrenWrapper) => {
  const { theme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const themeObject = currentTheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
};

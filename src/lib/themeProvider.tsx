"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import darkTheme from "@/styles/darkTheme";
import lightTheme from "@/styles/lightTheme";

import { ChildrenWrapper } from "@/interfaces/common";

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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeObject = theme === "dark" ? darkTheme : lightTheme;

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
};

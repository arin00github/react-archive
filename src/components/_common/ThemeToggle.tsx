import React, { useEffect, useState } from "react";

import styled from "styled-components";

const ThemeButton = styled.button`
  padding: 0.375rem 0.875rem;
  background-color: ${({ theme }) => theme.custom.color.background};
  border-color: ${({ theme }) => theme.custom.color.text};
  // border-color: transparent;
  color: ${({ theme }) => theme.custom.color.text};
`;

interface ThemeToggleProps {
  theme: string | undefined;
  systemTheme: "dark" | "light" | undefined;
  handleSeleteTheme: (val: string) => void;
}

const ThemeToggle = ({
  theme,
  systemTheme,
  handleSeleteTheme,
}: ThemeToggleProps) => {
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [loaded, setLoaded] = useState(false);

  const handleThemeToggle = () => {
    handleSeleteTheme(currentTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setLoaded(true);
    if (theme === undefined) {
      handleSeleteTheme("dark");
    }
  }, [setLoaded]);

  return (
    <ThemeButton onClick={handleThemeToggle} color="inherit">
      {currentTheme === "dark" && loaded ? <div>light</div> : <div>dark</div>}
    </ThemeButton>
  );
};

export default ThemeToggle;

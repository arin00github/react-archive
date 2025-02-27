import React, { useEffect, useState } from "react";

import styled from "styled-components";

const ThemeButton = styled.button`
  padding: 6px 14px;
  background-color: ${(props) => props.theme.bg};
  border-color: ${(props) => props.theme.borderColor2};
  // border-color: transparent;
  color: ${(props) => props.theme.fontColor};
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

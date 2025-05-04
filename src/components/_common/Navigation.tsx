"use client";

import styled from "styled-components";
import { useTheme } from "next-themes";

import { navMenus } from "@/constant/navigation";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useThemeMode } from "@/hooks/useThemeMode";

const StyledNavigation = styled.div`
  z-index: 5000;
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  width: 11.25rem;

  .box {
    margin-top: 0.375rem;
    border-style: solid;
    border-width: 1px;
    background-color: ${({ theme }) => theme.color.background};
    border-color: ${({ theme }) => theme.color.text};
    border-radius: 0.375rem;

    ul {
      li {
        height: 2.25rem;
        line-height: 2.25rem;
        padding: 0 0.75rem;
        cursor: pointer;

        &:hover {
          background-color: ${(props) => props.theme.hoverColor};
        }
      }
    }

    .themeBox {
      padding: 0.63rem;
    }
  }

  .navBtn {
    padding: 0.5rem 1.125rem;
    background-color: ${({ theme }) => theme.color.background};
    border-color: ${({ theme }) => theme.color.btnText};
    color: ${({ theme }) => theme.color.btnText};
  }
`;

const Navigation = () => {
  const router = useRouter();

  const { systemTheme, theme, setTheme } = useTheme();
  //const { themeMode, toggleTheme } = useThemeMode();

  const [open, setOpen] = useState<boolean>(false);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const handleSeleteTheme = (val: string) => {
    setTheme(val);
    //toggleTheme();
    setOpen(false);
  };

  const handleClickMenu = (val: string) => {
    router.push(val);

    setOpen(false);
  };
  return (
    <StyledNavigation>
      <button className="navBtn" onClick={handleToggleOpen}>
        Navigation
      </button>
      {open && (
        <div className="box">
          <ul className="menuBox">
            {navMenus.map((menu) => {
              return (
                <li key={menu.id} onClick={() => handleClickMenu(menu.href)}>
                  {menu.label}
                </li>
              );
            })}
          </ul>
          <div className="themeBox">
            <ThemeToggle
              systemTheme={systemTheme}
              theme={theme}
              handleSeleteTheme={handleSeleteTheme}
            />
          </div>
        </div>
      )}
    </StyledNavigation>
  );
};

export default Navigation;

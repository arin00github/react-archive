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
  top: 20px;
  right: 20px;
  width: 180px;

  .box {
    margin-top: 6px;
    border-style: solid;
    border-width: 1px;
    background-color: ${({ theme }) => theme.color.background};
    border-color: ${({ theme }) => theme.color.text};
    border-radius: 6px;

    ul {
      li {
        height: 36px;
        line-height: 36px;
        padding: 0 12px;
        cursor: pointer;

        &:hover {
          background-color: ${(props) => props.theme.hoverColor};
        }
      }
    }

    .themeBox {
      padding: 10px;
    }
  }

  .navBtn {
    padding: 8px 18px;
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

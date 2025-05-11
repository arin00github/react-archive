"use client";

import styled from "styled-components";
import { useTheme } from "next-themes";

import { navMenus } from "@/constant/navigation";
import ThemeToggle from "./ThemeToggle";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const StyledNavigation = styled.div`
  .overlay {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100vh;
    z-index: 4900;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .globalNav {
    z-index: 5000;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    display: flex;
    transform: translateX(0);
    transition: all 0.5s ease-in;

    &.hide {
      transform: translateX(12.3rem);
    }

    .box {
      width: 12rem;
      height: 100%;
      border-style: solid;
      border-width: 1px;
      background-color: ${({ theme }) => theme.color.background};
      border-color: ${({ theme }) => theme.color.text};

      .closeBtn {
        border: none;
      }

      ul {
        padding-top: 1rem;
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
      height: 2rem;
      padding: 0.5rem 1.125rem;
      border-radius: 0;
      background-color: ${({ theme }) => theme.color.background};
      border-color: ${({ theme }) => theme.color.btnText};
      color: ${({ theme }) => theme.color.btnText};
    }
  }
`;

const Navigation = () => {
  const router = useRouter();

  const { systemTheme, theme, setTheme } = useTheme();

  const boxRef = useRef<HTMLDivElement | null>(null);
  //const { themeMode, toggleTheme } = useThemeMode();

  const [isHide, setIsHide] = useState<boolean>(false);

  const handleToggleOpen = () => {
    console.log("toggle", isHide);
    if (isHide) {
      boxRef.current?.classList.add("hide");
    } else {
      boxRef.current?.classList.remove("hide");
    }
    setIsHide(!isHide);
  };

  const handleCloseBtn = () => {
    console.log("handleCloseBtn", isHide);
    boxRef.current?.classList.add("hide");
    setIsHide(!isHide);
  };

  const handleSeleteTheme = (val: string) => {
    setTheme(val);
    //toggleTheme();
    setIsHide(true);
  };

  const handleClickMenu = (val: string) => {
    router.push(val);
    setIsHide(true);
  };
  return (
    <StyledNavigation>
      {isHide && <div className="overlay"></div>}
      <div className="globalNav" ref={boxRef}>
        <button className="navBtn" onClick={handleToggleOpen}>
          My
        </button>
        <div className="box">
          <button className="closeBtn" onClick={handleCloseBtn}>
            Close
          </button>
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
      </div>
    </StyledNavigation>
  );
};

export default Navigation;

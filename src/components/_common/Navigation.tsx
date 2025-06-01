"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useTheme } from "next-themes";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { navMenus } from "@/constant/navigation";
import ThemeToggle from "./ThemeToggle";

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
    left: 0;
    height: 100vh;
    // display: flex;
    transform: translateX(0);
    transition: all 0.5s ease-in;

    &.hide {
      transform: translateX(-13rem);
    }

    .box {
      width: 13rem;
      height: 100%;
      //border-style: solid;
      //border-width: 1px;
      background-color: ${({ theme }) => theme.custom.color.background};
      // border-color: ${({ theme }) => theme.custom.color.text};
      box-shadow: 4px 12px 12px rgba(148, 148, 148, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .closeBtn {
        border: none;
      }

      ul.menuBox {
        padding-top: 3rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        li {
          color: ${({ theme }) => theme.custom.color.text100};
          height: 2.4rem;
          //line-height: 2.4rem;
          padding: 0 2rem;
          cursor: pointer;

          &:hover {
            // background-color: ${(props) => props.theme.hoverColor};
          }
        }
      }

      .themeBox {
        padding: 0.63rem;
      }
    }

    .navBtn {
      position: absolute;
      top: 0;
      right: -2rem;
      height: 2rem;
      width: 2rem;
      padding: 0;
      border: none;
      //padding: 1rem;
      border-radius: 0;
      box-shadow: 10px 2px 8px rgba(148, 148, 148, 0.4);
      background-color: ${({ theme }) => theme.custom.color.background};
      //border-color: ${({ theme }) => theme.custom.color.btnText};
      color: ${({ theme }) => theme.custom.color.btnText};
    }
  }
`;

interface INavigation {
  isOpen: boolean;
  handleToggle: () => void;
}

const Navigation = (props: INavigation) => {
  const router = useRouter();

  const { systemTheme, theme, setTheme } = useTheme();

  const boxRef = useRef<HTMLDivElement | null>(null);
  //const { themeMode, toggleTheme } = useThemeMode();

  const handleToggleOpen = () => {
    if (props.isOpen) {
      boxRef.current?.classList.add("hide");
    } else {
      boxRef.current?.classList.remove("hide");
    }
    props.handleToggle();
  };

  const handleSeleteTheme = (val: string) => {
    setTheme(val);
    //toggleTheme();
  };

  const handleClickMenu = (val: string) => {
    router.push(val);
    //setIsHide(true);
  };

  return (
    <StyledNavigation>
      {/* {isHide && <div className="overlay"></div>} */}
      <div className="globalNav" ref={boxRef}>
        <div className="box">
          {/* <button className="closeBtn" onClick={handleCloseBtn}>
            Close
          </button> */}
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
        <button className="navBtn" onClick={handleToggleOpen}>
          {props.isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
      </div>
    </StyledNavigation>
  );
};

export default Navigation;

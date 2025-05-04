"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import media from "@/styles/media";

type MenuProps = {
  title: string;
  href: string;
  isLeftMenu: boolean;
};

const BasicMenu: MenuProps[] = [
  { title: "세계지도", href: "/worldmap", isLeftMenu: true },
  // { title: "", href: "deplomacy/:detail", isLeftMenu: false },
  // { title: "글로벌 한국", href: "deplomacy", isLeftMenu: true },
  { title: "국가목록", href: "/diplomacy", isLeftMenu: true },
];

function MobileWorldAside() {
  const showArrayMenu = BasicMenu.filter((menu) => menu.isLeftMenu);

  const router = useRouter();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <StyledMenuButton onClick={handleClickButton}>Menu</StyledMenuButton>
      <StyledAside>
        {isOpen && (
          <div className="overlay">
            <StyledMenuBox>
              <div className="header">
                <div>Menu</div>
              </div>
              <ul>
                {showArrayMenu.map((menu) => {
                  return (
                    <li
                      key={`menu_${menu.title}`}
                      onClick={() => {
                        setIsOpen(false);
                        router.push(menu.href);
                      }}
                      className={
                        pathName.startsWith(menu.href) ? "selected" : ""
                      }
                    >
                      {menu.title}
                    </li>
                  );
                })}
              </ul>
              <div className="footer">
                <button onClick={handleClickButton}>close</button>
              </div>
            </StyledMenuBox>
          </div>
        )}
      </StyledAside>
    </>
  );
}

export default MobileWorldAside;

const StyledMenuButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
`;

const StyledMenuBox = styled.div`
  width: 40%;
  background-color: ${({ theme }) => theme.color.background};
  padding: 2rem 0.625rem;
  .header {
    text-align: center;
    margin-bottom: 0.8rem;
  }
  ul {
    display: flex;
    flex-direction: column;

    li {
      text-align: center;
      font-size: 0.875rem;
      box-sizing: border-box;
      width: 100%;
      cursor: pointer;
      padding: 0 1.12rem;
      height: 2.4rem;
      line-height: 2.4rem;
    }
    li:hover {
      background-color: #ebebeb;
      border-radius: 0.75rem;
    }
  }
  ul li.selected {
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
  }

  .footer {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledAside = styled.div`
  ${media.large`
  display: none;
    `}

  .overlay {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 8300;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

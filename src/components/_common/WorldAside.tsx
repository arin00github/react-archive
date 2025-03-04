"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

type MenuProps = {
  title: string;
  href: string;
  isLeftMenu: boolean;
};

const BasicMenu: MenuProps[] = [
  { title: "세계지도", href: "/worldmap", isLeftMenu: true },
  // { title: "", href: "deplomacy/:detail", isLeftMenu: false },
  // { title: "글로벌 한국", href: "deplomacy", isLeftMenu: true },
  { title: "국가목록", href: "/deplomacy", isLeftMenu: true },
];

function WorldAside() {
  const showArrayMenu = BasicMenu.filter((menu) => menu.isLeftMenu);

  const router = useRouter();

  return (
    <StyledAside>
      <ul>
        {showArrayMenu.map((menu) => {
          return (
            <li
              key={`menu_${menu.title}`}
              onClick={() => router.push(menu.href)}
            >
              {menu.title}
            </li>
          );
        })}
      </ul>
    </StyledAside>
  );
}

export default WorldAside;

const StyledAside = styled.div`
  width: 180px;
  //height: calc(100vh - 80px);
  position: fixed;
  top: 120px;
  left: 0;
  bottom: 40px;
  background-color: #fff;
  border-radius: 0px 12px 12px 0px;
  box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
  z-index: 100;
  font-size: 14px;

  ul {
    padding: 2rem 10px;
    li {
      padding: 0 18px;
      height: 2.4rem;
      line-height: 2.4rem;
    }
    li:hover {
      background-color: #ebebeb;
      border-radius: 12px;
    }
  }
`;

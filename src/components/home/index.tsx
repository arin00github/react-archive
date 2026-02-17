"use client";

import styled from "styled-components";

import { navMenus } from "@/constant/navigation";
import { useRouter } from "next/navigation";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  .wrapper {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    padding-bottom: 3rem;

    .title {
      font-size: 3rem;
      color: ${({ theme }) => theme.custom.color.text300};
      margin-bottom: 2rem;
    }
    .desc {
      margin-bottom: 3rem;
      color: ${({ theme }) => theme.custom.color.text100};
    }

    .groupBox {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-content: center;

      button.routerBtn {
        padding: 2rem;
        border-radius: 1rem;
        border: 1px solid ${({ theme }) => theme.custom.color.text100};
      }
    }
  }
`;

const HomeContainer = () => {
  const router = useRouter();
  const menuRouters = navMenus.filter((m) => m.id.includes("MENU"));

  const clickMenu = (href: string) => {
    router.push(href);
  };
  return (
    <StyledContainer>
      <div className="wrapper">
        <p className="title">Web API Archive Project</p>
        <p className="desc">Click below buttons to try service</p>
        <div className="groupBox">
          {menuRouters.map((menu) => {
            return (
              <button
                key={menu.id}
                className="routerBtn"
                onClick={() => clickMenu(menu.href)}
              >
                {menu.label}
              </button>
            );
          })}
        </div>
      </div>
    </StyledContainer>
  );
};

export default HomeContainer;

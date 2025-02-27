"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { navMenus } from "@/constant/navigation";

const Container = styled.div`
  width: "100%";
  height: 100vh;
  background-color: ${(props) => props.theme.bg};

  display: flex;
  justify-content: center;
  align-items: center;

  .centerBox {
    width: 300px;
  }
`;

const HomeContainer = () => {
  const router = useRouter();
  return (
    <Container>
      <div className="centerBox">
        {navMenus.map((menu) => {
          return (
            <div key={menu.id}>
              <div
                onClick={() => {
                  router.push(menu.href);
                }}
              >
                {menu.label}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default HomeContainer;

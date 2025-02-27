"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  width: "100%";
`;

const navMenus = [
  { label: "Archive", href: "/archive", id: "menu-archive" },
  { label: "Profile", href: "/profile", id: "menu-profile" },
];

const HomeContainer = () => {
  const router = useRouter();
  return (
    <Container>
      <div>
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

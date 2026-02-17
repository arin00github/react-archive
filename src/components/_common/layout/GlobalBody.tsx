"use client";

import { ChildrenWrapper } from "@/interfaces/common";
import styled from "styled-components";

const StyledGlobalBody = styled.div<{ isopen: string }>`
  width: ${(props) =>
    props.isopen === "true" ? "calc(100% - 13rem)" : "100%"};

  @media (max-width: 600px) {
    width: 100%;
  }
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s ease-in;

  .navBtn {
    position: absolute;
    top: 2rem;
    left: 2rem;
  }
`;

interface IGlobalBody extends ChildrenWrapper {
  isOpen: boolean;
  handleToggle: () => void;
}

const GlobalBody = (props: IGlobalBody) => {
  return (
    <StyledGlobalBody isopen={props.isOpen ? "true" : "false"}>
      {/* <button className="navBtn" onClick={props.handleToggle}>
        Nav
      </button> */}
      {props.children}
    </StyledGlobalBody>
  );
};

export default GlobalBody;

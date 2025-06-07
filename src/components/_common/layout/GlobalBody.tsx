"use client";

import { ChildrenWrapper } from "@/interfaces/common";
import styled from "styled-components";

const StyledGlobalBody = styled.div<{ isopen: string }>`
  position: fixed;
  width: ${(props) =>
    props.isopen === "true" ? "calc(100% - 13rem)" : "100%"};
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s ease-in;
`;

interface IGlobalBody extends ChildrenWrapper {
  isOpen: boolean;
}

const GlobalBody = (props: IGlobalBody) => {
  return (
    <StyledGlobalBody isopen={props.isOpen ? "true" : "false"}>
      {props.children}
    </StyledGlobalBody>
  );
};

export default GlobalBody;

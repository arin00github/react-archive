"use client";

import styled from "styled-components";

export const BasicStyleLayout = styled.div`
  width: "100%";
  height: 100vh;
  background-color: ${(props) => props.theme.custom.color.background};

  display: flex;
  justify-content: center;
  align-items: center;

  .centerBox {
    width: 300px;
  }
`;

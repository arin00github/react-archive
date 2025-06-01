"use client";

import styled from "styled-components";
import DrawingBoard from "./DrawingBoard";

const StyledDrawingContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  //padding: 2rem;
`;

const DrawingContainer = () => {
  return (
    <StyledDrawingContainer>
      <DrawingBoard />
    </StyledDrawingContainer>
  );
};

export default DrawingContainer;

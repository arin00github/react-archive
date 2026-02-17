"use client";

import styled from "styled-components";
//import InfoContainer from "./InfoContainer";
import media from "@/styles/media";

const DiplomacyListContainer = styled.div`
  position: fixed;
  z-index: 1400;
  width: 80%;
  top: 12%;
  bottom: 6%;
  right: 0;
  left: auto;
  height: 80%;
  background-color: ${({ theme }) => theme.custom.color.background};
  box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);

  ${media.large`
      width: 100%;
      left: 0;
      right: 0;
      top: 12%;
      bottom: 6%;
      border-radius:0;
    `}

  ${media.medium`
    top: 60px;
    bottom: 0;
    border-radius:0;
    width: 100%;
    left: 0;
    right: 0;
    height: calc(100% - 4rem);
    `}
`;

const DiplomacyDetailContainer = () => {
  return (
    <DiplomacyListContainer>{/* <InfoContainer /> */}</DiplomacyListContainer>
  );
};

export default DiplomacyDetailContainer;

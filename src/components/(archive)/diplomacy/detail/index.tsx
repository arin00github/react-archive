"use client";

import styled from "styled-components";
import InfoContainer from "./InfoContainer";
import media from "@/styles/media";

const DiplomacyListContainer = styled.div`
  position: fixed;
  z-index: 5000;
  width: 100%;
  top: 16%;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.bg};
  box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);

  ${media.large`
    width: 80%;
    top: 12%;
    bottom: 6%;
    right: 0;
    height: 80%;
      border-radius: 0.75rem 0px 0px 0.75rem ;
    `}
`;

const DiplomacyDetailContainer = () => {
  return (
    <DiplomacyListContainer>
      <InfoContainer />
    </DiplomacyListContainer>
  );
};

export default DiplomacyDetailContainer;

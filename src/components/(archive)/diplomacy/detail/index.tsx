"use client";

import styled from "styled-components";
import InfoContainer from "./InfoContainer";

const DiplomacyListContainer = styled.div`
  position: fixed;
  z-index: 5000;
  width: 80%;
  top: 120px;
  right: 0;
  bottom: 40px;
  background-color: white;
  border-radius: 12px 0px 0px 12px;
  box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
`;

const DiplomacyDetailContainer = () => {
  return (
    <DiplomacyListContainer>
      <InfoContainer />
    </DiplomacyListContainer>
  );
};

export default DiplomacyDetailContainer;

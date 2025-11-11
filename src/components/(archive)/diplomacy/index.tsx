"use client";

import styled from "styled-components";
import SearchContainer from "./SearchContainer";
import media from "@/styles/media";

const DiplomacyListContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 4rem;
  //margin-top: 6rem;
  padding: 0 3rem;
  justify-content: center;
  align-items: center;

  /* ${media.large`
    width: 100%;
    left: 0;
    right: 0;
    top: 12%;
    bottom: 6%;
    border-radius:0;
  `}

  ${media.medium`
    top: 4rem;
    bottom: 0;
    border-radius:0;
    width: 100%;
    left: 0;
    right: 0;
    height: calc(100% - 4rem);
  `} */
`;

const DiplomacyContainer = () => {
  return (
    <DiplomacyListContainer>
      <SearchContainer />
    </DiplomacyListContainer>
  );
};

export default DiplomacyContainer;

"use client";

import styled from "styled-components";

const StyledCreateFormCard = styled.button`
  // padding: 1rem;

  cursor: pointer;
`;

interface ICreateFormCard {
  handleCreate: () => void;
}

function CreateFormCard(props: ICreateFormCard) {
  return (
    <StyledCreateFormCard
      onClick={() => {
        props.handleCreate();
      }}
    >
      Create New Form
    </StyledCreateFormCard>
  );
}

export default CreateFormCard;

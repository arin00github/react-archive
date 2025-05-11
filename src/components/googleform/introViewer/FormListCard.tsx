"use client";

import { FormObject } from "@/interfaces/googleform";
import styled from "styled-components";

const StyledFormListCard = styled.div`
  padding: 1rem;
  border-radius: 0.625rem;
  border: 1px solid black;
  border-color: ${({ theme }) => theme.borderColor3};
`;

interface IFormListCard {
  data: FormObject;
  handleClick: () => void;
}

function FormListCard(props: IFormListCard) {
  return (
    <StyledFormListCard onClick={props.handleClick}>
      <div>{props.data.title}</div>
      <div>{props.data.createdAt}</div>
    </StyledFormListCard>
  );
}

export default FormListCard;

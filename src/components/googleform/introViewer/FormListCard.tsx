"use client";

import { FormObject } from "@/interfaces/googleform";
import styled from "styled-components";
import dayjs from "dayjs";

const StyledFormListCard = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.625rem;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }

  .info {
    .title {
      font-size: 1.2rem;
    }
    .date {
      margin-top: 0.5rem;
    }
  }

  .setBtn {
    width: 4rem;
    height: 2.4rem;
  }
`;

interface IFormListCard {
  data: FormObject;
  handleClick: () => void;
}

function FormListCard(props: IFormListCard) {
  return (
    <StyledFormListCard onClick={props.handleClick}>
      <div className="info">
        <div className="title">{props.data.title}</div>
        <div className="date">
          {dayjs(props.data.createdAt).format("YYYY-MM-DD")}
        </div>
      </div>
      <button className="setBtn">설정</button>
    </StyledFormListCard>
  );
}

export default FormListCard;

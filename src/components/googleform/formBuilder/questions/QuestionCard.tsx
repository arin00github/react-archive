"use Client";

import styled from "styled-components";
import { Question } from "@/interfaces/googleform";
import { TextField } from "@mui/material";

const StyledQuestionCard = styled.div`
  width: 100%;
  .card {
    width: 100%;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.custom.color.background};
    padding: 1.2rem;
  }
`;

interface IQuestionCard {
  question: Question;
}

function QuestionCard({ question }: IQuestionCard) {
  return (
    <StyledQuestionCard>
      <div className="card">
        <TextField value={question.label} variant="standard" />
      </div>
    </StyledQuestionCard>
  );
}

export default QuestionCard;

"use Client";

import styled from "styled-components";
import { GoogleFormInput } from "@/components/_common/googleform/GoogleFormInput";
import { Question } from "@/interfaces/googleform";

const StyledQuestionCard = styled.div`
  width: 100%;
  .card {
    width: 100%;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.bg};
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
        <GoogleFormInput value={question.label} onChange={() => {}} />
      </div>
    </StyledQuestionCard>
  );
}

export default QuestionCard;

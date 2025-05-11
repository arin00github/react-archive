"use Client";

import styled from "styled-components";

const StyledQuestionCard = styled.div`
  width: 100%;
  .card {
    width: 100%;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.bg};
  }
`;

function QuestionCard() {
  return (
    <StyledQuestionCard>
      <div className="card"></div>
    </StyledQuestionCard>
  );
}

export default QuestionCard;

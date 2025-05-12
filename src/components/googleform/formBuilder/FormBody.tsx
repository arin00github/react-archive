"use client";

import styled from "styled-components";
import { useForms } from "@/context/FormContext";
import QuestionCard from "./questions/QuestionCard";

const StyledFormBody = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: ${({ theme }) => theme.custom.color.secondary};

  .wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
    height: 100%;
  }
`;

function Formbody() {
  const { state } = useForms();
  const formData = state.forms.find((f) => f.formId === state.activeFormId);

  console.log("formData", formData);

  return (
    <StyledFormBody>
      {formData && (
        <div className="wrapper">
          <div>
            {formData.questions.map((quest) => {
              return (
                <QuestionCard
                  question={quest}
                  key={quest.questionId}
                ></QuestionCard>
              );
            })}
          </div>
        </div>
      )}
    </StyledFormBody>
  );
}

export default Formbody;

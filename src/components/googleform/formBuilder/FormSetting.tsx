"use client";

import { useForms } from "@/context/FormContext";
import { ChangeEvent } from "react";
import styled from "styled-components";

function FormSetting() {
  const { state, dispatch } = useForms();

  const currentForm = state.forms.find(
    (form) => form.formId === state.activeFormId
  );

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!state.activeFormId) return;
    dispatch({
      type: "UPDATE_FORM",
      payload: {
        id: state.activeFormId,
        updates: { title: e.target.value },
      },
    });
  };

  return (
    <StyledFormSetting>
      <div className="wrapper">
        <input
          type="text"
          value={currentForm?.title}
          onChange={handleChangeTitle}
        />
      </div>
    </StyledFormSetting>
  );
}

export default FormSetting;

const StyledFormSetting = styled.div`
  background-color: ${({ theme }) => theme.bg};

  .wrapper {
    padding: 1rem;

    .title {
      font-size: 1.25rem;
    }

    input {
      height: 38px;
      line-height: 38px;
      border-color: transparent;
    }
  }
`;

"use client";

import styled from "styled-components";
import CreateFormCard from "./CreateFormCard";
import { useForms } from "@/context/FormContext";
import { FormObject } from "@/interfaces/googleform";
import FormListCard from "./FormListCard";
import { useRouter } from "next/navigation";

const StyledCardContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;

function createForm(): FormObject {
  const dateString = Date.now();
  return {
    formId: `form_${dateString}`,
    questions: [
      {
        questionId: `question_${dateString}`,
        required: false,
        order: 1,
        type: "checkbox",
        label: "",
      },
    ],
    title: "No title",
    description: "",
    createdAt: `${dateString}`,
  };
}

function FormIntroViewContainer() {
  const { state, dispatch } = useForms();
  const router = useRouter();

  console.log("state", state.forms);

  const handleCreate = () => {
    const newForm = createForm();
    dispatch({ type: "CREATE_FORM", payload: newForm });
  };

  const handleClickListCard = (id: string) => {
    dispatch({ type: "SET_ACTIVE_FORM", payload: id });
    router.push(`/googleform/${id}/edit`);
  };

  return (
    <div>
      <StyledCardContainer>
        <div className="wrapper">
          <CreateFormCard handleCreate={handleCreate} />
          <div>
            {state.forms.map((form) => {
              return (
                <FormListCard
                  key={form.formId}
                  handleClick={() => handleClickListCard(form.formId)}
                  data={form}
                ></FormListCard>
              );
            })}
          </div>
        </div>
      </StyledCardContainer>
    </div>
  );
}

export default FormIntroViewContainer;

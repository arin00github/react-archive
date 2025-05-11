import { FormObject, Question } from "@/interfaces/googleform";

export interface FormState {
  forms: FormObject[];
  activeFormId: string | null;
}

export type FormsAction =
  | { type: "CREATE_FORM"; payload: FormObject }
  | { type: "DELETE_FORM"; payload: string }
  | { type: "SET_ACTIVE_FORM"; payload: string }
  | {
      type: "UPDATE_FORM";
      payload: { id: string; updates: Partial<FormObject> };
    }
  | {
      type: "UPDATE_QUESTION";
      payload: {
        formId: string;
        questionId: string;
        updates: Partial<Question>;
      };
    }
  | { type: "ADD_QUESTION"; payload: { formId: string; question: Question } }
  | {
      type: "DELETE_QUESTION";
      payload: { formId: string; questionId: string };
    };

export const formsReducer = (state: FormState, action: FormsAction) => {
  switch (action.type) {
    case "CREATE_FORM":
      console.log("CREATE_FORM");
      return {
        ...state,
        forms: [...state.forms, action.payload],
        activeFormId: action.payload.formId,
      };
    case "DELETE_FORM":
      return {
        ...state,
        forms: state.forms.filter((f) => f.formId !== action.payload),
        activeFormId:
          state.activeFormId === action.payload ? null : state.activeFormId,
      };
    case "SET_ACTIVE_FORM":
      return { ...state, activeFormId: action.payload };
    case "UPDATE_FORM":
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.formId === action.payload.id
            ? { ...f, ...action.payload.updates }
            : f
        ),
      };
    case "ADD_QUESTION":
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.formId === action.payload.formId
            ? { ...f, questions: [...f.questions, action.payload.question] }
            : f
        ),
      };

    case "UPDATE_QUESTION":
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.formId === action.payload.formId
            ? {
                ...f,
                questions: f.questions.map((q) =>
                  q.questionId === action.payload.questionId
                    ? { ...q, ...action.payload.updates }
                    : q
                ),
              }
            : f
        ),
      };

    case "DELETE_QUESTION":
      return {
        ...state,
        forms: state.forms.map((f) =>
          f.formId === action.payload.formId
            ? {
                ...f,
                questions: f.questions.filter(
                  (q) => q.questionId !== action.payload.questionId
                ),
              }
            : f
        ),
      };

    default:
      return state;
  }
};

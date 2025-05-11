export type QuestionType =
  | "short"
  | "paragraph"
  | "multiple"
  | "checkbox"
  | "dropdown";

export type FormObject = {
  formId: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: string;
  updatedAt?: string;
};

export type Question = {
  questionId: string;
  order: number;
  type: QuestionType;
  label: string;
  required: boolean;
  options?: string[];
};

export type Option = {
  id: string;
  label: string;
};

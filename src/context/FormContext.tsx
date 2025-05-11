"use client";

import { FormsAction, formsReducer, FormState } from "@/hooks/formReducers";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

const FormsContext = createContext<
  { state: FormState; dispatch: Dispatch<FormsAction> } | undefined
>(undefined);

export const FormsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(formsReducer, {
    forms: [],
    activeFormId: null,
  });
  console.log("provider", state.forms);

  useEffect(() => {
    console.log("useEffect update", state.forms);
    localStorage.setItem("jins_forms", JSON.stringify(state.forms));
  }, [state.forms]);

  return (
    <FormsContext.Provider value={{ state, dispatch }}>
      {children}
    </FormsContext.Provider>
  );
};

export const useForms = () => {
  const context = useContext(FormsContext);

  if (!context) throw new Error("useForms must be used in FormProvider");
  return context;
};

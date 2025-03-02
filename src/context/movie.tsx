import { ChildrenWrapper } from "@/interfaces/common";
import { MovieObject } from "@/interfaces/movie";
import { Dispatch, createContext, useContext, useReducer } from "react";

const initialData: MovieObject = {
  title: "",
  count: 0,
  time: "",
};

type ActionType = {
  type: string;
  payload: any;
};

const reducer = (state: MovieObject, action: ActionType) => {
  switch (action.type) {
    case "SETTER":
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

export type MovieContextType = {
  state: MovieObject;
  dispatch: Dispatch<ActionType>;
};

export const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: ChildrenWrapper) => {
  const [state, dispatch] = useReducer(reducer, initialData);
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieBook = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw Error("context is null");
  }
  return context;
};

"use client";

import { MovieContext, MovieProvider, useMovieBook } from "@/context/movie";
import { useContext } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: "100%";
  height: 100vh;
  background-color: ${(props) => props.theme.bg};

  display: flex;
  justify-content: center;
  align-items: center;

  .centerBox {
    width: 300px;
  }
`;

const StyledSelectForm = styled.div`
  .formRow {
    display: flex;
    margin-bottom: 20px;
    label {
      width: 120px;
    }
    input,
    select {
      height: 38px;
      width: 100%;
    }
  }
`;

const movieOptions = [
  { label: "Exorcism Chronicles", value: "exorcism" },
  { label: "Herry Potter", value: "herry" },
  { label: "Load of the Ring", value: "ring" },
];

const timeOption = [
  { label: "09:00", value: "09:00" },
  { label: "11:00", value: "11:00" },
  { label: "14:20", value: "14:20" },
];

const SelectForm = () => {
  const { state, dispatch } = useMovieBook();

  console.log("context state", state);

  return (
    <StyledSelectForm>
      <div className="formRow">
        <label htmlFor="movie-title">title</label>
        <select
          name=""
          id="movie-title"
          value={state.title}
          onChange={(e) => {
            dispatch({
              type: "SETTER",
              payload: { key: "title", value: e.target.value },
            });
          }}
        >
          {movieOptions.map((movie) => {
            return (
              <option value={movie.value} key={movie.value}>
                {movie.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="formRow">
        <label htmlFor="movie-time">time</label>
        <select
          name=""
          id="movie-time"
          value={state.time}
          onChange={(e) => {
            dispatch({
              type: "SETTER",
              payload: { key: "time", value: e.target.value },
            });
          }}
        >
          {timeOption.map((movie) => {
            return (
              <option value={movie.value} key={movie.value}>
                {movie.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="formRow">
        <label htmlFor="movie-time">count</label>
        <input
          type="number"
          value={state.count}
          onChange={(e) => {
            dispatch({
              type: "SETTER",
              payload: { key: "count", value: e.target.value },
            });
          }}
        />
      </div>
    </StyledSelectForm>
  );
};

const StateContainer = () => {
  return (
    <Container>
      <MovieProvider>
        <SelectForm />
      </MovieProvider>
    </Container>
  );
};

export default StateContainer;

"use client";

import styled from "styled-components";

import { MovieProvider, useMovieBook } from "@/context/movie";
import { BasicStyleLayout } from "../_common/style/BasicLayout";

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

  const handleChangeForm = (key: string, val: any) => {
    dispatch({
      type: "SETTER",
      payload: { key, value: val },
    });
  };

  return (
    <StyledSelectForm>
      <form
        id="movie-book-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log("click submit form");
        }}
      >
        <div className="formRow">
          <label htmlFor="movie-title">title</label>
          <select
            name=""
            id="movie-title"
            value={state.title}
            onChange={(e) => {
              handleChangeForm("title", e.target.value);
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
          <label htmlFor="movie-title">date</label>
          <input
            id="movie-date"
            type="date"
            value={state.date}
            onChange={(e) => {
              handleChangeForm("date", e.target.value);
            }}
          />
        </div>
        <div className="formRow">
          <label htmlFor="movie-time">time</label>
          <select
            name="movie-time"
            id="movie-time"
            value={state.time}
            onChange={(e) => {
              handleChangeForm("time", e.target.value);
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
          <label htmlFor="movie-count">count</label>
          <input
            type="number"
            id="movie-count"
            value={state.count}
            onChange={(e) => {
              handleChangeForm("count", e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </StyledSelectForm>
  );
};

const StateContainer = () => {
  return (
    <BasicStyleLayout>
      <MovieProvider>
        <SelectForm />
      </MovieProvider>
    </BasicStyleLayout>
  );
};

export default StateContainer;

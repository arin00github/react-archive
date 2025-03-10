import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import countryReducer from "./country/countrySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      country: countryReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

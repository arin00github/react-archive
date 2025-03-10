import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CountryState {
  selectedCountryIos?: string;
}

const initialState: CountryState = {
  selectedCountryIos: undefined,
};

const countrySlice = createSlice({
  name: "country",
  initialState: initialState,
  reducers: {
    updateSelectedCountry: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.selectedCountryIos = action.payload;
    },
  },
});

export const { updateSelectedCountry } = countrySlice.actions;

export const selectedCountry = (state: RootState) => state.user;

export default countrySlice.reducer;

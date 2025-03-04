import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  id: string;
  name: string;
}

const initialState: UserState = {
  name: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { updateUserInfo } = userSlice.actions;

export const userInfo = (state: RootState) => state.user;

export default userSlice.reducer;

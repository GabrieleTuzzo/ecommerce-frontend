import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthorized: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isAuthorized = false;
      state.user = null;
    },
  },
});

export const {} = userSlice.actions;

export default createSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    loginStorage: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, loginStorage } = userSlice.actions;

export default userSlice.reducer;

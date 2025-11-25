import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthorized: false,
    token: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      localStorage.setItem("token", action.payload.access_token);
    },
    logout: (state, action) => {
      state.isAuthorized = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

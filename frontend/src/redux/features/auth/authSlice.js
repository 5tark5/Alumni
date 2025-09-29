import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instituteInfo: localStorage.getItem("instituteInfo")
    ? JSON.parse(localStorage.getItem("instituteInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.instituteInfo = action.payload;
      localStorage.setItem("instituteInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.instituteInfo = null;
      localStorage.removeItem("instituteInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
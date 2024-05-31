import { createSlice } from "@reduxjs/toolkit";

const initialState: { userInfo: Auth } = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setCredentials: (state, action: { payload: Auth }) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;

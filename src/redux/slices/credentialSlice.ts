import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserInfo {
  userInfo: any;
}

const initialState: IUserInfo = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "")
    : null,
};

const credentialSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    removeCredentials: (state, _action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      document.cookie = "jwt=expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
});

export const { setCredentials, removeCredentials } = credentialSlice.actions;

export default credentialSlice.reducer;

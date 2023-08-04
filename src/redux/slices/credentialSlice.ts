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
    },
  },
});

export const { setCredentials, removeCredentials } = credentialSlice.actions;

export default credentialSlice.reducer;

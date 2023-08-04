import { configureStore } from "@reduxjs/toolkit";
import credentialReducer from "./slices/credentialSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    credentials: credentialReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

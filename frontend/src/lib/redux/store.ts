import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import requestsReducer from "./features/requestsSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
export const makeStore = () => {
  return configureStore({
    reducer: { authReducer, requestsReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
  username: string;
}

type InitialState = {
  value: AuthState;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "name",
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
        },
      };
    },
  },
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;

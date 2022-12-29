import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/User";

interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean,
  error: string;
}

const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    onStart(state) {
      state.isLoading = true
    },
    onError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    onSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false
      state.error = ''
      state.user = action.payload;
    },

  }
});


export default authSlice.reducer;

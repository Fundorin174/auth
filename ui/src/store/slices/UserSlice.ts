import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/User";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string,
}

const initialState: UserState = {
  users: [] as IUser[],
  isLoading: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching(state) {
      state.isLoading = true
    },
    userFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.error = ''
      state.users = action.payload;
      state.isLoading = false

    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
  }
});


export default userSlice.reducer;

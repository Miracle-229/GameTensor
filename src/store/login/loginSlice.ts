import { createSlice } from '@reduxjs/toolkit';

import { IAuth } from '@/helper/Types/game';
import { loginAction } from './loginThunk';

type loginState = {
  data: IAuth;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: loginState = {
  data: {
    login: '',
    password: '',
  },
  status: 'idle',
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

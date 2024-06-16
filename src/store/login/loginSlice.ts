import { createSlice } from '@reduxjs/toolkit';
import { loginAction } from './loginThunk';

type loginState = {
  data: {
    httpStatus: string;
    message: string;
    errCode: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: loginState = {
  data: {
    httpStatus: '',
    message: '',
    errCode: '',
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
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as { message: string }).message ||
          action.error.message ||
          null;
      });
  },
});

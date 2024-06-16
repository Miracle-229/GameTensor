import { createSlice } from '@reduxjs/toolkit';

import { deleteCookie } from 'cookies-next';
import { logoutAction } from './logoutThunk';

type logoutState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: logoutState = {
  status: 'idle',
  error: null,
};

export const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.status = 'succeeded';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        deleteCookie('user');
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IAuth } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getCurrentUserAction } from './currentUserThunk';

const hydrate = createAction<AppState>(HYDRATE);

type CurrentUserState = {
  data: IAuth;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CurrentUserState = {
  data: {
    userId: '',
    email: '',
    login: '',
  },
  status: 'idle',
  error: null,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.currentUser,
        };
      })
      .addCase(getCurrentUserAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCurrentUserAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getCurrentUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

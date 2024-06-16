/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IAuth } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getUserNameAction } from './getUserNameThunk';

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

export const getUserNameSlice = createSlice({
  name: 'getUserName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.getUserName,
        };
      })
      .addCase(getUserNameAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserNameAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUserNameAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import type { AppState } from '../store';
import { getNotifCountAction } from './getNotifCountThunk';

const hydrate = createAction<AppState>(HYDRATE);

type notifCountState = {
  data: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: notifCountState = {
  data: 0,
  status: 'idle',
  error: null,
};

export const getNotifCountSlice = createSlice({
  name: 'getNotifCount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.getNotifCount,
        };
      })
      .addCase(getNotifCountAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getNotifCountAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getNotifCountAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

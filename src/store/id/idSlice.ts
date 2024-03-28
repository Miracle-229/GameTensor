/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IGameData } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getIdAction } from './idThunk';

const hydrate = createAction<AppState>(HYDRATE);

type idState = {
  data: IGameData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: idState = {
  data: [],
  status: 'idle',
  error: null,
};

export const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.id,
        };
      })
      .addCase(getIdAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getIdAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getIdAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

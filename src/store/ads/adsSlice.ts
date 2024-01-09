/* eslint-disable no-console */

'use client';

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IAds } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getAdsAction } from './adsThunk';

const hydrate = createAction<AppState>(HYDRATE);

type AdsState = {
  data: IAds[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: AdsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.ads,
        };
      })
      .addCase(getAdsAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAdsAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getAdsAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

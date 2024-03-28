/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ITags } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getTagsAction } from './tagsThunk';

const hydrate = createAction<AppState>(HYDRATE);

type TagsState = {
  data: ITags[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: TagsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.tags,
        };
      })
      .addCase(getTagsAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTagsAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getTagsAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

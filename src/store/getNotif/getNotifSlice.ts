/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { INotif } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getNotifAction } from './getNotifThunk';

const hydrate = createAction<AppState>(HYDRATE);

type notifState = {
  data: {
    content: INotif[];
    pageable: {
      pageNumber: number;
    };
    totalPages: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: notifState = {
  data: {
    content: [
      {
        creationDate: '',
        linkId: '',
        message: '',
        notificationId: 0,
        read: false,
      },
    ],
    pageable: {
      pageNumber: 0,
    },
    totalPages: 0,
  },
  status: 'idle',
  error: null,
};

export const getNotifSlice = createSlice({
  name: 'getNotif',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.getNotif,
        };
      })
      .addCase(getNotifAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getNotifAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getNotifAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

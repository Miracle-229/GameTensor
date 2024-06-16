/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IMessages } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getMessagesAction } from './getMessagesThunk';

const hydrate = createAction<AppState>(HYDRATE);

type CurrentUserState = {
  data: {
    content: IMessages[];
    pageable: {
      pageNumber: number;
    };
    totalPages: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CurrentUserState = {
  data: {
    content: [
      {
        date: '',
        messageId: 0,
        chatId: '',
        isChanged: false,
        isRead: false,
        text: '',
        user: {
          email: '',
          login: '',
          status: '',
          userId: 0,
        },
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

export const getMessagesSlice = createSlice({
  name: 'getMessages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.getMessages,
        };
      })
      .addCase(getMessagesAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMessagesAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getMessagesAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

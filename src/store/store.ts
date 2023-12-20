'use client';

import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { searchSlice } from './searchSlice';
import { tagsSlice } from './tagsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice.reducer,
      tags: tagsSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

import { configureStore } from '@reduxjs/toolkit';
import { searchSlice } from './searchSlice';
import { tagsSlice } from './tagsSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    tags: tagsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

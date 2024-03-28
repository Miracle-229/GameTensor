import { createSlice } from '@reduxjs/toolkit';
import { postBookmarkAction } from './postBookmarkThunk';

type bookmarkState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: bookmarkState = {
  status: 'idle',
  error: null,
};

export const postBookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postBookmarkAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postBookmarkAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(postBookmarkAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

import { createSlice } from '@reduxjs/toolkit';
import { deleteBookmarkAction } from './deleteBookmarkThunk';

type bookmarkState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: bookmarkState = {
  status: 'idle',
  error: null,
};

export const deleteBookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBookmarkAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBookmarkAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteBookmarkAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

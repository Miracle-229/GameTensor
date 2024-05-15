import { createSlice } from '@reduxjs/toolkit';
import { patchStatusUserAction } from './patchStatusUserThunk';

type statusUserState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: statusUserState = {
  status: 'idle',
  error: null,
};

export const patchStatusUserSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(patchStatusUserAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchStatusUserAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(patchStatusUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

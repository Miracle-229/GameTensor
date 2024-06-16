import { createSlice } from '@reduxjs/toolkit';
import { patchStatusNotifAction } from './pathStatusNotifThunk';

type statusUserState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: statusUserState = {
  status: 'idle',
  error: null,
};

export const patchStatusNotifSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(patchStatusNotifAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchStatusNotifAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(patchStatusNotifAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

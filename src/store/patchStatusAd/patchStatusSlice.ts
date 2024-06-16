import { createSlice } from '@reduxjs/toolkit';
import { patchStatusAdAction } from './patchStatusSelectorAd';

type statusAdState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: statusAdState = {
  status: 'idle',
  error: null,
};

export const patchStatusAdSlice = createSlice({
  name: 'adStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(patchStatusAdAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchStatusAdAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(patchStatusAdAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

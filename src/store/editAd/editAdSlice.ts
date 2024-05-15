import { createSlice } from '@reduxjs/toolkit';
import { editAdAction } from './editAdThunk';

type createAdState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: createAdState = {
  status: 'idle',
  error: null,
};

export const editAdSlice = createSlice({
  name: 'editAD',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editAdAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editAdAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(editAdAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

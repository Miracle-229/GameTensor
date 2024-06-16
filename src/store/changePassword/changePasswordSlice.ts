import { createSlice } from '@reduxjs/toolkit';
import { changePasswordAction } from './changePasswordThunk';

type changePasswordState = {
  data: {
    httpStatus: string;
    message: string;
    errCode: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: changePasswordState = {
  data: {
    httpStatus: '',
    message: '',
    errCode: '',
  },
  status: 'idle',
  error: null,
};

export const changePasswordsSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changePasswordAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as { message: string }).message ||
          action.error.message ||
          null;
      });
  },
});

import { createSlice } from '@reduxjs/toolkit';
import { registrationAction } from './registrationThunk';

type registrationState = {
  data: {
    httpStatus: string;
    message: string;
    errCode: string;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: registrationState = {
  data: {
    httpStatus: '',
    message: '',
    errCode: '',
  },
  status: 'idle',
  error: null,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registrationAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registrationAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(registrationAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as { message: string }).message ||
          action.error.message ||
          null;
      });
  },
});

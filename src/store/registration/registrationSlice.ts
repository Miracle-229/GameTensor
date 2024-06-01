import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '@/helper/Types/game';
import { registrationAction } from './registrationThunk';

type registrationState = {
  data: IAuth;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: registrationState = {
  data: {
    login: '',
    email: '',
    password: '',
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
      })
      .addCase(registrationAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ImageIdState = {
  [adId: string]: string;
};

const initialState: ImageIdState = {};

export const imageIdSlice = createSlice({
  name: 'imageId',
  initialState,
  reducers: {
    setImageId: (
      state,
      action: PayloadAction<{ adId: string; imageSrc: string }>
    ) => {
      const { adId, imageSrc } = action.payload;
      state[adId] = imageSrc;
    },
  },
});

export const { setImageId } = imageIdSlice.actions;

import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectCreateAd = (state: AppState) => state.createAd;

export const createAdStatus = createSelector(
  selectCreateAd,
  (createAd) => createAd.status
);

export const createAdError = createSelector(
  selectCreateAd,
  (createAd) => createAd.error
);

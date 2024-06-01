import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectEditAd = (state: AppState) => state.editAd;

export const editAdStatus = createSelector(
  selectEditAd,
  (editAd) => editAd.status
);

export const editAdError = createSelector(
  selectEditAd,
  (editAd) => editAd.error
);

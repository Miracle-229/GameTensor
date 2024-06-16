import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectAds = (state: AppState) => state.ads;

export const adsData = createSelector(selectAds, (ads) => ads.data);

export const adsStatus = createSelector(selectAds, (ads) => ads.status);

export const adsError = createSelector(selectAds, (ads) => ads.error);

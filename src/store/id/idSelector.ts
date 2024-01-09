import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectId = (state: AppState) => state.id;

export const adsStatus = createSelector(selectId, (ads) => ads.status);

export const adsError = createSelector(selectId, (ads) => ads.error);

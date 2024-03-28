import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectBookmark = (state: AppState) => state.bookmark;

export const bookmarkData = createSelector(selectBookmark, (ads) => ads.data);

export const bookmarkStatus = createSelector(
  selectBookmark,
  (ads) => ads.status
);

export const bookmarkError = createSelector(selectBookmark, (ads) => ads.error);

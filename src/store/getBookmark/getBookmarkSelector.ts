import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectBookmark = (state: AppState) => state.bookmark;

export const bookmarkData = createSelector(
  selectBookmark,
  (bookmark) => bookmark.data
);

export const bookmarkStatus = createSelector(
  selectBookmark,
  (bookmark) => bookmark.status
);

export const bookmarkError = createSelector(
  selectBookmark,
  (bookmark) => bookmark.error
);

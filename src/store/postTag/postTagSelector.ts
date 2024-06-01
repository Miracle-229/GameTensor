import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectPostTag = (state: AppState) => state.postTag;

export const postTagStatus = createSelector(
  selectPostTag,
  (postTag) => postTag.status
);

export const postTagError = createSelector(
  selectPostTag,
  (postTag) => postTag.error
);

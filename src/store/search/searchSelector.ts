import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectSearch = (state: AppState) => state.search;

export const searchData = createSelector(selectSearch, (search) => search.data);

export const searchStatus = createSelector(
  selectSearch,
  (search) => search.status
);

export const searchError = createSelector(
  selectSearch,
  (search) => search.error
);

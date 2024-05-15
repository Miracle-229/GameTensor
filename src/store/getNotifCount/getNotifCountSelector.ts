import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectNotifCount = (state: AppState) => state.getNotifCount;

export const notifCountData = createSelector(
  selectNotifCount,
  (notifCount) => notifCount.data
);

export const notifCountStatus = createSelector(
  selectNotifCount,
  (notifCount) => notifCount.status
);

export const notifCountError = createSelector(
  selectNotifCount,
  (notifCount) => notifCount.error
);

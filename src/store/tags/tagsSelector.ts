import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectTags = (state: AppState) => state.tags;

export const tagsStatus = createSelector(selectTags, (tags) => tags.status);

export const tagsError = createSelector(selectTags, (tags) => tags.error);

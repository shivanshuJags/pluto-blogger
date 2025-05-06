import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthorState } from './author.reducer';

export const selectAuthorState = createFeatureSelector<AuthorState>('author');

export const selectAllAuthors = createSelector(selectAuthorState, state => state.authors);
export const selectSelectedAuthor = createSelector(selectAuthorState, state => state.selectedAuthor);
export const selectAuthorLoading = createSelector(selectAuthorState, state => state.loading);
export const selectAuthorError = createSelector(selectAuthorState, state => state.error);

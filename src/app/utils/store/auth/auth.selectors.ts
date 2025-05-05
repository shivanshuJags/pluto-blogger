// auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../types/auth.type';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.uid
);

export const selectProfilePhoto = createSelector(
  selectAuthState,
  (state: AuthState) => state.photoURL
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

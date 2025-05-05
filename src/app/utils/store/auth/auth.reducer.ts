import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../../types/auth.type';

export const initialState: AuthState = {
  uid: null,
  name: null,
  email: null,
  photoURL: null,
};

export const authReducer = createReducer(
  initialState,

  // Set user info
  on(AuthActions.setUser, (state, { uid, name, email, photoURL }) => ({
    ...state,
    uid,
    name,
    email,
    photoURL,
  })),

  // Clear user info
  on(AuthActions.clearUser, () => initialState),

  // Also handle logout as a store-clearing action
  on(AuthActions.logout, () => initialState)
);

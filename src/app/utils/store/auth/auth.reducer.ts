import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../../types/auth.type';

const sessionUser = sessionStorage.getItem('user');
export const initialState: AuthState = sessionUser
  ? JSON.parse(sessionUser)
  : {
    uid: null,
    name: null,
    email: null,
    photoURL: null,
    phone: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    bio: null
  };

export const authReducer = createReducer(
  initialState,

  on(AuthActions.setUser, (state, user) => {
    const userData = { ...user };
    sessionStorage.setItem('user', JSON.stringify(userData));
    return { ...state, ...userData };
  }),

  on(AuthActions.clearUser, () => {
    sessionStorage.removeItem('user');
    return {
      uid: null,
      name: null,
      email: null,
      photoURL: null
    };
  }),

  on(AuthActions.loadAuthorProfileSuccess, (state, { user }) => ({ ...state, ...user })),

  on(AuthActions.logout, () => initialState)
);

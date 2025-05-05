import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
    '[Auth] Set User',
    props<{ uid: string; name: string; email: string; photoURL: string }>()
);

export const clearUser = createAction('[Auth] Clear User');
export const logout = createAction('[Auth] Logout');
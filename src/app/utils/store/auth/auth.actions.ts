import { createAction, props } from '@ngrx/store';
import { AuthState } from '../../types/auth.type';

export const setUser = createAction(
    '[Auth] Set User',
    props<AuthState>()
);

export const clearUser = createAction('[Auth] Clear User');
export const logout = createAction('[Auth] Logout');


export const updateProfile = createAction(
    '[Auth] Update Profile',
    props<AuthState>()
);

export const updateProfileSuccess = createAction('[Auth] Update Profile Success');
export const updateProfileFailure = createAction('[Auth] Update Profile Failure', props<{ error: any }>());

export const loadAuthorProfile = createAction(
    '[Auth] Load Author Profile',
    props<{ uid: string }>()
);

export const loadAuthorProfileSuccess = createAction(
    '[Auth] Load Author Profile Success',
    props<{ user: AuthState }>()
);

export const loadAuthorProfileFailure = createAction(
    '[Auth] Load Author Profile Failure',
    props<{ error: any }>()
);
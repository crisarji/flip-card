import { createAction, props } from '@ngrx/store';

import { Authenticate, User } from '@app/features/authentication/models';

// Happy path
export const login = createAction('[Auth/API] Login', props<{ authenticate: Authenticate }>());
export const register = createAction('[Auth/API] Register', props<{ authenticate: Authenticate }>());
export const logout = createAction('[Auth/API] Logout');
export const resetStates = createAction('[Auth/API] Reset States');
export const getUser = createAction('[Auth/API] Get User', props<{ user?: User }>());
export const loginSuccess = createAction('[Auth/API] Login Success', props<{ user: User }>());
export const registerSuccess = createAction('[Auth/API] Register Success', props<{ user?: User }>());
export const authenticated = createAction('[Auth/API] Authenticated', props<{ user?: User }>());

// Un-Happy path
export const notAuthenticated = createAction('[Auth/API] Not Authenticated', (errorMessage = 'Invalid user') => ({
  payload: { errorMessage },
}));
export const loginFailure = createAction('[Auth/API] Login Failure', (errorMessage = 'Error logging in') => ({
  payload: { errorMessage },
}));

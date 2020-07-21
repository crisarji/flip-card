import { Action, createReducer, on } from '@ngrx/store';

import { User } from '@app/features/authentication/models/user';
import * as authActions from '@app/features/authentication/state/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  loading: boolean;
  user: User | null;
  error: '';
}

export const initialState: AuthState = {
  error: '',
  user: null,
  loading: false,
};

const reducer = createReducer(
  initialState,
  on(authActions.login, state => ({
    ...state,
    loading: true,
  })),
  on(authActions.getUser, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(authActions.logout, state => ({
    ...state,
    user: null,
    loading: true,
  })),
  on(authActions.authenticated, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(authActions.notAuthenticated, state => ({
    ...state,
    ...initialState,
    user: null,
    loading: false,
  })),
  on(authActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(authActions.loginFailure, state => ({
    ...state,
    user: null,
    loading: false,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}

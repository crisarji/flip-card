import { storeReset } from 'ngrx-store-reset';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';

import * as authActions from '@app/features/authentication/state/auth.actions';

import * as boardReducer from '@app/features/board/state/board.reducer';
import * as scoresReducer from '@app/features/scores/state/scores.reducer';
import * as authReducer from '@app/features/authentication/state/auth.reducer';
import * as instrutionsReducer from '@app/features/instructions/state/instructions.reducer';

export interface ApplicationState {
  auth: authReducer.AuthState;
  board: boardReducer.State;
  instructions: instrutionsReducer.State;
  scores: scoresReducer.State;
}

export function defaultReducer<T>(state: T) {
  return state;
}

export const initialReducerMap = {
  auth: defaultReducer,
  board: defaultReducer,
  instructions: defaultReducer,
  scores: defaultReducer,
} as ActionReducerMap<ApplicationState>;

export function getInitialState() {
  return {
    auth: authReducer.initialState,
    board: boardReducer.initialState,
    instructions: instrutionsReducer.initialState,
    scores: scoresReducer.initialState,
  } as ApplicationState;
}

export function storeResetMetaReducer(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
  return storeReset({ action: authActions.resetStates().type })(reducer);
}

export const metaReducers: MetaReducer<ApplicationState>[] = [storeResetMetaReducer];

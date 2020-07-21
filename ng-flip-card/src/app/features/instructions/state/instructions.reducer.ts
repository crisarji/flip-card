import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Level } from '@app/features/core/models/level.model';
import * as instructionsActions from '@app/features/instructions/state/instructions.actions';

export const instructionsFeatureKey = 'instructions';

export interface LevelState extends EntityState<Level> {}

export interface State {
  levels: LevelState;
  selectedLevelId: string;
}

export const adapterLevel: EntityAdapter<Level> = createEntityAdapter<Level>();

const levelInitialState: LevelState = adapterLevel.getInitialState();

export const initialState = {
  levels: levelInitialState,
  selectedLevelId: null,
};

const reducer = createReducer(
  initialState,
  on(instructionsActions.addLevel, (state, { level }) => ({
    ...state,
    levels: adapterLevel.addOne(level, state.levels),
  })),
  on(instructionsActions.updateLevel, (state, { level }) => ({
    ...state,
    levels: adapterLevel.upsertOne(level, state.levels),
  })),
  on(instructionsActions.selectedLevel, (state, { levelId }) => ({
    ...state,
    selectedLevelId: levelId,
  }))
);

export function instructionsReducer(state: State = initialState, action: Action) {
  return reducer(state, action);
}

export const selectLevelState = (state: State) => state.levels;
export const selectLevelIdState = (state: State) => state.selectedLevelId;

export const { selectAll: selectAllLevels } = adapterLevel.getSelectors();

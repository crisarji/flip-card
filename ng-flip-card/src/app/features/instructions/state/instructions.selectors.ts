import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as instructionsReducer from '@app/features/instructions/state/instructions.reducer';

export const instructionsFeature = createFeatureSelector<instructionsReducer.State>(
  instructionsReducer.instructionsFeatureKey
);

export const selectLevelState = createSelector(instructionsFeature, instructionsReducer.selectLevelState);
export const selectedLevelId = createSelector(instructionsFeature, instructionsReducer.selectLevelIdState);

export const selectAllLevels = createSelector(selectLevelState, instructionsReducer.selectAllLevels);

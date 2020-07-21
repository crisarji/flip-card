import { createAction, props } from '@ngrx/store';

import { Level } from '@app/features/core/models/level.model';

// Happy path
export const loadLevels = createAction('[Level/API] Load Levels');
export const addLevel = createAction('[Level/API] Add Level', props<{ level: Level }>());
export const updateLevel = createAction('[Level/API] Update Level', props<{ level: Level }>());
export const selectedLevel = createAction('[Level/API] Selected Level', props<{ levelId: string }>());
export const levelActionSuccess = createAction('[Level/API] Level Action Success');

// Un-Happy path
export const levelActionFailure = createAction(
  '[Level/API] Level Action Failure',
  (errorMessage = 'Error in level') => ({
    payload: { errorMessage },
  })
);

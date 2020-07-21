import { createAction, props } from '@ngrx/store';

import { Score } from '@app/features/core/models/score.model';

// Happy path

export const loadScores = createAction('[Score/API] Load Scores');
export const addScore = createAction('[Score/API] Add Score', props<{ score: Score }>());
export const updateScore = createAction('[Score/API] Update Score', props<{ score: Score }>());

export const scoreActionSuccess = createAction('[Score/API] Score Action Success');

// Un-Happy path
export const scoreActionFailure = createAction(
  '[Score/API] Score Action Failure',
  (errorMessage = 'Error in score') => ({
    payload: { errorMessage },
  })
);

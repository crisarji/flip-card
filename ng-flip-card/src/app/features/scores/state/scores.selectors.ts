import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Score } from '@app/features/core/models/score.model';
import * as scoreReducer from '@app/features/scores/state/scores.reducer';

export const scoreFeature = createFeatureSelector<scoreReducer.State>(scoreReducer.scoresFeatureKey);

export const selectScoreState = createSelector(scoreFeature, scoreReducer.selectScoreState);

export const selectAllScores = createSelector(selectScoreState, scoreReducer.selectAllScores);

// Custom selectors
export const getTop5 = createSelector(selectAllScores, (allScores: Score[], props: { levelId: string }) => {
  return allScores
    .filter(score => score.levelId === props.levelId)
    .sort(timestampComparer)
    .slice(0, 5); // <= take only the first 5 records
});

function timestampComparer(score1: Score, score2: Score) {
  const firstElement = (score1.endTimeStamp - score1.startTimeStamp) / 1000;
  const secondElement = (score2.endTimeStamp - score2.startTimeStamp) / 1000;

  return firstElement > secondElement ? 1 : firstElement < secondElement ? -1 : 0;
}

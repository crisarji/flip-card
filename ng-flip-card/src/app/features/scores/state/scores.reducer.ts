import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as scoreActions from '@app/features/scores/state/scores.actions';
import { Score } from '@app/features/core/models/score.model';

export const scoresFeatureKey = 'scores';

export interface ScoreState extends EntityState<Score> {}

export interface State {
  scores: ScoreState;
}

export const adapterScore: EntityAdapter<Score> = createEntityAdapter<Score>();

const scoreInitialState: ScoreState = adapterScore.getInitialState();

export const initialState = {
  scores: scoreInitialState,
};

const reducer = createReducer(
  initialState,
  on(scoreActions.addScore, (state, { score }) => ({ scores: adapterScore.addOne(score, state.scores) })),
  on(scoreActions.updateScore, (state, { score }) => ({ scores: adapterScore.upsertOne(score, state.scores) }))
);

export function scoresReducer(state: State = initialState, action: Action) {
  return reducer(state, action);
}

export const selectScoreState = (state: State) => state.scores;

export const { selectAll: selectAllScores } = adapterScore.getSelectors();

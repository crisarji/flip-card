import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Card } from '@app/features/core/models/card.model';
import * as boardActions from '@app/features/board/state/board.actions';

export const boardFeatureKey = 'board';

export interface CardState extends EntityState<Card> {}

export interface State {
  cards: CardState;
}

export const adapterCard: EntityAdapter<Card> = createEntityAdapter<Card>();

const cardInitialState: CardState = adapterCard.getInitialState();

export const initialState = {
  cards: cardInitialState,
};

const reducer = createReducer(
  initialState,
  on(boardActions.addCard, (state, { card }) => ({ ...state, cards: adapterCard.addOne(card, state.cards) }))
);

export function boardReducer(state: State = initialState, action: Action) {
  return reducer(state, action);
}

export const selectCardState = (state: State) => state.cards;

export const { selectAll: selectAllCards } = adapterCard.getSelectors();

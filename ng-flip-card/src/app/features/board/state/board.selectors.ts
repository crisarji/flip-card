import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Card } from '@app/features/core/models/card.model';
import { Level } from '@app/features/core/models/level.model';
import * as boardReducer from '@app/features/board/state/board.reducer';
import * as instructionsReducer from '@app/features/instructions/state/instructions.reducer';

export const boardFeature = createFeatureSelector<boardReducer.State>(boardReducer.boardFeatureKey);
export const instructionsFeature = createFeatureSelector<instructionsReducer.State>(
  instructionsReducer.instructionsFeatureKey
);

export const selectCardState = createSelector(boardFeature, boardReducer.selectCardState);
export const selectLevelIdState = createSelector(instructionsFeature, instructionsReducer.selectLevelIdState);
export const selectLevelState = createSelector(instructionsFeature, instructionsReducer.selectLevelState);

export const selectAllLevels = createSelector(selectLevelState, instructionsReducer.selectAllLevels);
export const selectAllCards = createSelector(selectCardState, boardReducer.selectAllCards);

// Custom selectors
export const selectAllCardsVisible = createSelector(selectAllCards, (allCards: Card[]) =>
  allCards.map(card => ({ ...card, visible: true }))
);

export const shuffleDeck = createSelector(selectAllCards, (allCards: Card[], props: { size: number }) => {
  const halfDeck = allCards.filter((item, index) => index < props.size / 2);
  const deckShuffle = [...halfDeck, ...halfDeck].map((item, index) => ({
    ...item,
    position: index,
    visible: true,
  }));
  return deckShuffle.sort(() => Math.random() - 0.5);
});

export const getLevelSelected = createSelector(
  selectAllLevels,
  selectLevelIdState,
  (allLevels: Level[], levelSelectedId: string) => allLevels.find(level => level.id === levelSelectedId)
);

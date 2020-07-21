import { createAction, props } from '@ngrx/store';

import { Card } from '@app/features/core/models/card.model';

// Happy path
export const loadCards = createAction('[Card/API] Load Cards');
export const addCard = createAction('[Card/API] Add Card', props<{ card: Card }>());
export const cardActionSuccess = createAction('[Card/API] Card Action Success');

// Un-Happy path
export const cardActionFailure = createAction('[Card/API] Card Action Failure', (errorMessage = 'Error in card') => ({
  payload: { errorMessage },
}));

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as scoreActions from '@app/features/scores/state/scores.actions';
import { ScoresService } from '@app/features/scores/services/scores.service';

@Injectable()
export class ScoresEffects {
  constructor(private actions$: Actions, private scoresService: ScoresService) {}

  public loadScores$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(scoreActions.loadScores),
      switchMap(_ =>
        from(this.scoresService.getScores()).pipe(
          map(actionToDispatch => actionToDispatch),
          catchError(errorMessage => of(console.log(`Error when loading scores: ${errorMessage}`)))
        )
      )
    )
  );
}

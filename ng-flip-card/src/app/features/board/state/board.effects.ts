import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as boardActions from '@app/features/board/state/board.actions';
import { BoardService } from '@app/features/board/services/board.service';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private cardService: BoardService) {}

  public loadCards$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActions.loadCards),
      switchMap(_ =>
        from(this.cardService.getDeck()).pipe(
          map(actionToDispatch => actionToDispatch),
          catchError(errorMessage => of(console.log(`Error when loading cards: ${errorMessage}`)))
        )
      )
    )
  );
}

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { LevelService } from '@app/features/instructions/services/level.service';
import * as instructionsActions from '@app/features/instructions/state/instructions.actions';

@Injectable()
export class InstructionsEffects {
  constructor(private actions$: Actions, private levelService: LevelService) {}

  public loadLevels$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(instructionsActions.loadLevels),
      switchMap(_ =>
        from(this.levelService.getLevels()).pipe(
          map(actionToDispatch => actionToDispatch),
          catchError(errorMessage => of(console.log(`Error when loading levels: ${errorMessage}`)))
        )
      )
    )
  );
}

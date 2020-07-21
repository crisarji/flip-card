import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take, switchMap, tap } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';

import { ApplicationState } from '@app/features/global-state/app.state';
import { InstructionsSelectors } from '@app/features/instructions/state';

@Injectable({
  providedIn: 'root',
})
export class BoardGuard implements CanActivate {
  constructor(private applicationState: Store<ApplicationState>, public router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.applicationState.select(InstructionsSelectors.selectedLevelId).pipe(
      take(1),
      switchMap(async levelId => (levelId ? true : false)),
      tap(valid => !valid && this.router.navigate(['/instructions']))
    );
  }
}

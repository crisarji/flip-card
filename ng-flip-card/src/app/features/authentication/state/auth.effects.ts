import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of, from, Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';

import { User } from '@app/features/authentication/models/user';
import { AuthService } from '@app/features/authentication/auth.service';
import * as authActions from '@app/features/authentication/state/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  public login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(data =>
        from(this.authService.logIn(data.authenticate)).pipe(
          map((user: void | User) =>
            this.authService.isAuthenticated$ && user
              ? authActions.loginSuccess({ user })
              : authActions.notAuthenticated()
          ),
          catchError(errorMessage => of(authActions.loginFailure({ errorMessage })))
        )
      )
    )
  );

  public register$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(data =>
        from(this.authService.register(data.authenticate)).pipe(
          map((user: void | User) =>
            this.authService.isAuthenticated$ && user
              ? authActions.loginSuccess({ user })
              : authActions.notAuthenticated()
          ),
          catchError(errorMessage => of(authActions.loginFailure({ errorMessage })))
        )
      )
    )
  );

  public getCurrentUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getUser),
      switchMap(_ =>
        from(
          this.authService.currentUser$.pipe(
            map(user => (!user ? authActions.logout() : authActions.authenticated({ user }))),
            catchError(errorMessage => of(authActions.notAuthenticated({ errorMessage })))
          )
        )
      )
    )
  );

  public logout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      switchMap(_ =>
        from(this.authService.logOut()).pipe(
          map(user => authActions.notAuthenticated()),
          catchError(errorMessage => of(authActions.notAuthenticated({ errorMessage })))
        )
      )
    )
  );

  public navigateToInstructions$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(_ => this.router.navigate([`instructions`]))
      ),
    { dispatch: false }
  );

  public authFailure$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginFailure, authActions.notAuthenticated),
        tap(error => this.router.navigate([`auth`]))
      ),
    { dispatch: false }
  );
}

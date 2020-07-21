import { Store } from '@ngrx/store';
import { LocationStrategy } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Authenticate } from '@app/features/authentication/models';
import { AuthState } from '@app/features/authentication/state/auth.reducer';
import { login, register } from '@app/features/authentication/state/auth.actions';

export enum DisplayView {
  Login,
  Register,
}

@Component({
  selector: 'fc-auth',
  templateUrl: `./auth.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public DisplayView = DisplayView;
  public currentView = DisplayView.Login;

  constructor(private store: Store<AuthState>, private location: LocationStrategy) {
    // preventing back button in browser
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  public login(authenticate: Authenticate): void {
    this.store.dispatch(login({ authenticate }));
  }

  public register(authenticate: Authenticate): void {
    this.store.dispatch(register({ authenticate }));
    this.changeToLogin();
  }

  public changeToRegister(): void {
    this.currentView = DisplayView.Register;
  }

  public changeToLogin(): void {
    this.currentView = DisplayView.Login;
  }
}

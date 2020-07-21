import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { User } from '@app/features/authentication/models';
import { ApplicationState } from '@app/features/global-state/app.state';
import { AuthSelectors, AuthActions } from '@app/features/authentication/state';

@Component({
  selector: 'fc-layout',
  templateUrl: `./layout.component.html`,
  styleUrls: [`./layout.component.scss`],
})
export class LayoutComponent implements OnInit {
  public user$: Observable<User | null>;

  constructor(private applicationState: Store<ApplicationState>) {}

  public ngOnInit(): void {
    this.applicationState.dispatch(AuthActions.getUser({}));
    this.user$ = this.applicationState.select(AuthSelectors.getUser);
  }

  public logOut(): void {
    this.applicationState.dispatch(AuthActions.logout());
    this.applicationState.dispatch(AuthActions.resetStates());
  }
}

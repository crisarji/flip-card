import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';

import { User, Authenticate } from '@app/features/authentication/models';
import { SnackBarComponent } from '@app/shared/controls/controls.module';
import { AngularFirestore, AngularFireAuth } from '../core/firebase/firebase.module';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  public async updateUser(authenticate: Authenticate): Promise<void> {
    try {
      await this.afAuth.auth.currentUser.updateProfile({ displayName: authenticate.nickName });
    } catch (err) {
      return console.log(err);
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get isAuthenticated$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => user !== null));
  }

  public get currentUser$(): Observable<User | undefined> {
    return this.afAuth.authState.pipe(map(user => user));
  }

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    private subscriptionService: SubscriptionService,
    private snackBar: SnackBarComponent,
    private apiService: ApiService
  ) {
    this.afAuth.authState.pipe(takeUntil(this.subscriptionService.releaseServices$)).subscribe(user => {
      if (user === null) {
        this.router.navigate([`auth`]);
      }
    });
  }

  public async logIn(authenticate: Authenticate): Promise<void | User> {
    return await this.afAuth.auth
      .signInWithEmailAndPassword(authenticate.email, authenticate.password)
      .then(user => user.user)
      .catch(error => {
        this.snackBar.openSnackBar('There is an error with this credentials, try again.', 'Close', 'error-color');
      });
  }

  public async logOut(): Promise<void> {
    await this.afAuth.auth
      .signOut()
      .then(_ => console.log('user successfully loged out'))
      .catch(_ => console.log('error while loging user out'));
  }

  public async register(authenticate: Authenticate): Promise<void | any> {
    return await this.afAuth.auth
      .createUserWithEmailAndPassword(authenticate.email, authenticate.password)
      .then(async user => {
        await this.apiService.updateUser(authenticate);
        this.snackBar.openSnackBar('You have been logged in with your new credentials!.', 'Close', 'success-color');
        return this.logIn(authenticate);
      })
      .catch(error =>
        this.snackBar.openSnackBar(
          'There is an error with this credentials during the register, try again.',
          'Close',
          'error-color'
        )
      );
  }
}

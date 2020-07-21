import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { AngularFireAuth } from '@app/features/core/firebase/firebase.module';
import { FirestoreResponse } from '@app/features/core/firebase/models/firebase.response.model';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';
import { FirebaseFirestoreService } from '@app/features/core/firebase/services/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class BoardFacadeService {
  constructor(
    public firestoreService: FirebaseFirestoreService,
    private afAuth: AngularFireAuth,
    private subscriptionService: SubscriptionService
  ) {}

  public getDeck(): Observable<Action> {
    return this.firestoreService.getObjects$('deck').pipe(
      takeUntil(this.subscriptionService.releaseServices$),
      mergeMap(item => item),
      map((firebaseResult: FirestoreResponse) => ({
        type: this.getDeckAction(firebaseResult.type),
        card: { id: firebaseResult.payload.doc.key, ...firebaseResult.payload.doc.data() },
      }))
    );
  }

  public async setScore(levelId: string, startTimeStamp: number, endTimeStamp: number) {
    const userScore = {
      nickName: this.afAuth.auth.currentUser.displayName,
      levelId,
      startTimeStamp,
      endTimeStamp,
    };
    this.firestoreService.putObject(`scores/${this.afAuth.auth.currentUser.uid}`, userScore);
  }

  private getDeckAction(expression: string): string {
    let result = '';
    result = !result && expression === 'added' ? '[Card/API] Add Card' : result;
    result = !result && expression === 'modified' ? '[Card/API] Update Card' : result;
    result = !result && expression === 'removed' ? '[Card/API] Delete Card' : result;
    return result;
  }
}

import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { FirestoreResponse } from '@app/features/core/firebase/models/firebase.response.model';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';
import { FirebaseFirestoreService } from '@app/features/core/firebase/services/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ScoresFacadeService {
  constructor(public firestoreService: FirebaseFirestoreService, private subscriptionService: SubscriptionService) {}

  public getScores(): Observable<Action> {
    return this.firestoreService.getObjects$('scores').pipe(
      takeUntil(this.subscriptionService.releaseServices$),
      mergeMap(item => item),
      map((firebaseResult: FirestoreResponse) => ({
        type: this.getScoreAction(firebaseResult.type),
        score: { id: firebaseResult.payload.doc.id, ...firebaseResult.payload.doc.data() },
      }))
    );
  }

  private getScoreAction(expression: string): string {
    let result = '';
    result = !result && expression === 'added' ? '[Score/API] Add Score' : result;
    result = !result && expression === 'modified' ? '[Score/API] Update Score' : result;
    result = !result && expression === 'removed' ? '[Score/API] Delete Score' : result;
    return result;
  }
}

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
export class InstructionsFacadeService {
  constructor(public firestoreService: FirebaseFirestoreService, private subscriptionService: SubscriptionService) {}

  public getLevels(): Observable<Action> {
    return this.firestoreService.getObjects$('levels').pipe(
      takeUntil(this.subscriptionService.releaseServices$),
      mergeMap(item => item),
      map((firebaseResult: FirestoreResponse) => ({
        type: this.getLevelAction(firebaseResult.type),
        level: { id: firebaseResult.payload.doc.key, ...firebaseResult.payload.doc.data() },
      }))
    );
  }

  private getLevelAction(expression: string): string {
    let result = '';
    result = !result && expression === 'added' ? '[Level/API] Add Level' : result;
    result = !result && expression === 'modified' ? '[Level/API] Update Level' : result;
    result = !result && expression === 'removed' ? '[Level/API] Delete Level' : result;
    return result;
  }
}

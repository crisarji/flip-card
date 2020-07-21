import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@app/features/core/firebase/firebase.module';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreService {
  constructor(private firestore: AngularFirestore) {}

  public getObjects$(collection: string): Observable<any> {
    return this.firestore.collection(`${collection}`).stateChanges();
  }

  public putObject(baseUrl: string, keyValues: {}): void {
    this.firestore.doc(`${baseUrl}`).set(keyValues);
  }
}

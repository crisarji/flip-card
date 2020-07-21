import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  public releaseComponent = new Subject<void>();
  public releaseServices$ = this.releaseComponent.asObservable();
}

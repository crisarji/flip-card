import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';

import { Card } from '@app/features/core/models/card.model';
import { Level } from '@app/features/core/models/level.model';
import { BoardFacadeService } from '@app/features/board/services/board-facade.service';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private selectedCard: Card = null;
  private startTimeStamp: number;
  private endTimeStamp: number;
  private levelId: string;

  public timeElapsed = new Subject<number>();

  constructor(private boardFacadeService: BoardFacadeService, private subscriptionService: SubscriptionService) {}

  public getDeck(): Observable<any> {
    return this.boardFacadeService.getDeck();
  }

  public setScore(): void {
    this.endTimeStamp = new Date().getTime();
    this.boardFacadeService.setScore(this.levelId, this.startTimeStamp, this.endTimeStamp);
  }

  public resetSelectedCard(): void {
    this.selectedCard = null;
  }

  public filterDeck(deck$: Observable<Card[]>, card: Card): Observable<any> {
    if (this.selectedCard && this.selectedCard.name === card.name && this.selectedCard.position !== card.position) {
      deck$ = deck$.pipe(
        takeUntil(this.subscriptionService.releaseServices$),
        map((items: Card[]) => items.map(item => (item.name === card.name ? { ...item, visible: false } : item))),
        tap((items: Card[]) => items.every(item => !item.visible) && this.gameOver()),
        tap(_ => (this.selectedCard = null))
      );
    } else {
      this.selectedCard = card;
    }
    return deck$;
  }

  public startTimer(level: Level): Observable<number> {
    this.startTimeStamp = new Date().getTime();
    this.levelId = level.id;
    return timer(100, level.time * 10).pipe(takeUntil(this.subscriptionService.releaseServices$));
  }

  public gameOver(): void {
    this.setScore();
    this.timeElapsed.next((this.endTimeStamp - this.startTimeStamp) / 1000);
  }
}

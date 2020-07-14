import { map, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, timer, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterContentChecked } from '@angular/core';

import { Card } from '@app/features/core/models/card.model';
import { GameService } from '@app/features/services/game.service';
import { GameLevel } from '@app/features/core/enums/game-levels.enum';
import { ShuffleService } from '@app/features/services/shuffle.service';
import { fadeInOutAnimation } from '@app/features/core/animations/ng-animations';

@Component({
  selector: 'fc-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [...fadeInOutAnimation]
})
export class BoardComponent implements OnInit, OnDestroy, AfterContentChecked {
  private queueOfOne = [];
  private timerSubscription: Subscription;
  private unsubscribeTimer = new Subject();
  private unsubscribeShuffle = new Subject();

  public gameInProgress = true;
  public userWins = false;
  public progressValue = 0;
  public cardsList$: Observable<any>;

  constructor(private route: ActivatedRoute, private router: Router,
    private gameService: GameService, private changeDetector: ChangeDetectorRef,
    private shuffleService: ShuffleService) { }

  public ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        const gameLevel = params['gameLevel'] || GameLevel.Easy;
        this.setLevelFeatures(gameLevel);
      });
    this.cardsList$ = this.shuffleService.getShuffleDeck().pipe(takeUntil(this.unsubscribeShuffle));
  }

  public ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
    this.unsubscribeShuffle.next(true);
    this.unsubscribeShuffle.complete();
  }

  public ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  private setLevelFeatures(gameLevel: GameLevel): void {
    const { time, cardsTotal } = this.gameService.getLevelTimeInSeconds(gameLevel)

    this.shuffleService.setShuffleDeck(cardsTotal);
    this.timerSubscription = timer(100, time * 10).pipe(takeUntil(this.unsubscribeTimer)).subscribe(timing => this.tickerCheck(timing));
  }

  private tickerCheck(ticksElapsed: number): void {
    this.progressValue = ticksElapsed;
    ticksElapsed === 100 && this.gameOver(false);
  }

  public gameOver(isWinner: boolean = false): void {
    this.gameInProgress = false;
    isWinner && (this.userWins = true);

    this.unsubscribeTimer.next();
    this.router.navigate([], { replaceUrl: true });
  }

  public reassignCardList(card: Card): void {
    setTimeout(() => {
      const queuedItem = this.queueOfOne.length ? this.queueOfOne[0] : null;
      if (queuedItem &&
        queuedItem.name === card.name &&
        queuedItem.position !== card.position) {
        this.cardsList$ = this.cardsList$.pipe(
          map((items: Card[]) => items.map(item => item.name === card.name ? { ...item, visible: false } : item)),
          tap((items: Card[]) => (items.every(item => !item.visible) && this.gameOver(true))),
          tap(_ => this.queueOfOne.shift())
        );
      } else {
        this.queueOfOne.shift();
        this.queueOfOne.push(card);
      }
    }, 1200);
  }
}



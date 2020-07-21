import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterContentChecked,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Card } from '@app/features/core/models/card.model';
import { Level } from '@app/features/core/models/level.model';
import { ApplicationState } from '@app/features/global-state/app.state';
import { BoardActions, BoardSelectors } from '@app/features/board/state';
import { BoardService } from '@app/features/board/services/board.service';
import { fadeInOutAnimation } from '@app/features/core/animations/ng-animations';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Component({
  selector: 'fc-board',
  templateUrl: './board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [...fadeInOutAnimation],
})
export class BoardComponent implements OnInit, OnDestroy, AfterContentChecked {
  public timeElapsed = 0;
  public progressBar = 0;
  public userWins = false;
  public gameInProgress = true;
  public flipsCounter = 0;
  public disableBoard = false;

  public deck$: Observable<Card[] | null>;

  constructor(
    private router: Router,
    private boardService: BoardService,
    private changeDetector: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
    private applicationState: Store<ApplicationState>
  ) {}

  public ngOnInit(): void {
    this.applicationState.dispatch(BoardActions.loadCards());
    this.applicationState
      .pipe(select(BoardSelectors.getLevelSelected))
      .subscribe(level => this.setLevelFeatures(level));
    this.boardService.timeElapsed.subscribe(totalTime => (this.timeElapsed = totalTime) && this.gameOver(true));
  }

  public ngOnDestroy(): void {
    this.subscriptionService.releaseComponent.next();
  }

  public ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  private setLevelFeatures(level: Level): void {
    this.deck$ = this.applicationState.pipe(select(BoardSelectors.shuffleDeck, { size: level.size }));
    this.boardService.startTimer(level).subscribe(ticksElapsed => this.tickerCheck(ticksElapsed));
  }

  private tickerCheck(ticksElapsed: number): void {
    this.progressBar = ticksElapsed;
    ticksElapsed === 100 && this.gameOver(false);
  }

  public gameOver(isWinner: boolean = false): void {
    this.gameInProgress = false;
    isWinner && (this.userWins = true);
    this.router.navigate([], { replaceUrl: true });
  }

  public filterDeck(card: Card): void {
    this.applyDelay();
    setTimeout(() => {
      this.deck$ = this.boardService.filterDeck(this.deck$, card);
    }, 1200);
  }

  private applyDelay() {
    this.flipsCounter++;
    if (this.flipsCounter === 2) {
      this.disableBoard = true;
      this.boardService.resetSelectedCard();
      setTimeout(() => {
        this.disableBoard = false;
        this.flipsCounter = 0;
      }, 1000);
    }
  }
}

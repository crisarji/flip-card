import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MatRadioChange } from '@app/shared/shared.module';
import { Level } from '@app/features/core/models/level.model';
import { Score } from '@app/features/core/models/score.model';
import { ApplicationState } from '@app/features/global-state/app.state';
import { ScoresSelectors, ScoresActions } from '@app/features/scores/state';
import { InstructionsActions, InstructionsSelectors } from '@app/features/instructions/state';

@Component({
  selector: 'fc-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstructionsComponent implements OnInit {
  public levelName = 'easy';
  public levelColor = null;
  public timeInSeconds = null;
  public isMenuOpen: boolean = false;

  public scores$: Observable<Score[] | null>;
  public gameLevels$: Observable<Level[] | null>;

  public mobileQuery: MediaQueryList;

  constructor(
    private applicationState: Store<ApplicationState>,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.initializeMobileBehavior();
  }

  public ngOnInit(): void {
    this.applicationState.dispatch(InstructionsActions.loadLevels());
    this.applicationState.dispatch(ScoresActions.loadScores());

    this.gameLevels$ = this.applicationState.pipe(select(InstructionsSelectors.selectAllLevels));
    this.scores$ = this.applicationState.pipe(select(ScoresSelectors.getTop5, { levelId: this.levelName }));
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public changeLevel(selected: MatRadioChange): void {
    this.applicationState.dispatch(InstructionsActions.selectedLevel({ levelId: selected.value }));
    this.scores$ = this.applicationState.pipe(select(ScoresSelectors.getTop5, { levelId: selected.value }));
    this.levelName = selected.value;
    this.levelColor = selected.source.color;
  }

  private initializeMobileBehavior() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  private mobileQueryListener: () => void;

  public changeTime = (time: number) => (this.timeInSeconds = time);

  public invokeKickOff = () => this.router.navigate(['/board']);

  public toggleMenu = () => (this.isMenuOpen = !this.isMenuOpen);
}

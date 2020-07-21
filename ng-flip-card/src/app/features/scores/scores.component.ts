import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Score } from '@app/features/core/models/score.model';

@Component({
  selector: 'fc-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoresComponent {
  @Input() public scores: [Score | null];
  @Input() public levelName: string;
}

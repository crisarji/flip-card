import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { MatRadioChange } from '@app/shared/shared.module';
import gameLevels from '@app/mockdata/json/game-levels.json';
import { Level } from '@app/features/core/models/level.model';
import { GameService } from '@app/features/services/game.service';

@Component({
  selector: 'fc-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  public timeInSeconds = null;
  public gameLevel = null;
  public levelColor = null;
  public gameLevels: Level[] = [...gameLevels];

  constructor(private router: Router, private gameService: GameService) { }

  public changeLevel(selected: MatRadioChange): void {
    this.gameLevel = selected.value;
    this.levelColor = selected.source.color;

    const { time } = this.gameService.getLevelTimeInSeconds(selected.value);
    this.timeInSeconds = time;
  }

  public invokeKickOff = () => this.router.navigate(['/board'], { queryParams: { gameLevel: this.gameLevel } });
}

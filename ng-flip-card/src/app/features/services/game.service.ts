import { Injectable } from '@angular/core';

import { LevelSetup } from '@app/features/core/models/level-setup';
import { GameLevel } from '@app/features/core/enums/game-levels.enum';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public getLevelTimeInSeconds(level: string): LevelSetup {
    let time: number;
    let cardsTotal: number;

    switch (level) {
      case GameLevel.Easy:
        time = 15;
        cardsTotal = 8;
      break;
      case GameLevel.Medium:
        time = 20;
        cardsTotal = 10;
      break;
      case GameLevel.Hard:
        time = 25;
        cardsTotal = 12;
      break;
      default: 
        time = 15;
        cardsTotal = 8;
      break;
    }

    return { time, cardsTotal };
  }
}

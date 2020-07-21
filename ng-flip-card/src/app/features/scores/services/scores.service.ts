import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ScoresFacadeService } from '@app/features/scores/services/scores-facade.service';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private scoresFacadeService: ScoresFacadeService) {}

  public getScores(): Observable<any> {
    return this.scoresFacadeService.getScores();
  }
}

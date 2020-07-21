import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { InstructionsFacadeService } from '@app/features/instructions/services/instructions-facade.service';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  constructor(private instructionsFacadeService: InstructionsFacadeService) {}

  public getLevels(): Observable<any> {
    return this.instructionsFacadeService.getLevels();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { ScoresStoreModule } from '@app/features/scores/state';
import { ScoresComponent } from './scores.component';

const ngModules = [CommonModule, SharedModule, RouterModule];

const customModules = [ScoresStoreModule];

@NgModule({
  imports: [...ngModules, ...customModules],
  declarations: [ScoresComponent],
  exports: [ScoresComponent],
})
export class ScoresModule {}

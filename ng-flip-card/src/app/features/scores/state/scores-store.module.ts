import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { ScoresEffects } from '@app/features/scores/state/scores.effects';
import { scoresFeatureKey, scoresReducer } from '@app/features/scores/state/scores.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(scoresFeatureKey, scoresReducer),
    EffectsModule.forFeature([ScoresEffects]),
  ],
  providers: [ScoresEffects],
})
export class ScoresStoreModule {}

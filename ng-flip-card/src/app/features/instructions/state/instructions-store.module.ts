import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { InstructionsEffects } from '@app/features/instructions/state/instructions.effects';
import { instructionsFeatureKey, instructionsReducer } from '@app/features/instructions/state/instructions.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(instructionsFeatureKey, instructionsReducer),
    EffectsModule.forFeature([InstructionsEffects]),
  ],
  providers: [InstructionsEffects],
})
export class InstructionsStoreModule {}

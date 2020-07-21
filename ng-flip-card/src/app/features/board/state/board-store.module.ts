import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { BoardEffects } from '@app/features/board/state/board.effects';
import { boardFeatureKey, boardReducer } from '@app/features/board/state/board.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(boardFeatureKey, boardReducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
  providers: [BoardEffects],
})
export class BoardStoreModule { }

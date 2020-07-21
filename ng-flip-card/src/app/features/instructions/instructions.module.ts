import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { ScoresModule } from '@app/features/scores/scores.module';
import { InstructionsStoreModule } from '@app/features/instructions/state';
import { InstructionsComponent } from '@app/features/instructions/instructions.component';
import { InstructionsRoutingModule } from '@app/features/instructions/instructions-routing.module';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  InstructionsStoreModule,
  SharedModule,
  RouterModule,
  InstructionsRoutingModule,
  ScoresModule,
];

@NgModule({
  imports: [...modules],
  declarations: [InstructionsComponent],
  exports: [InstructionsComponent],
})
export class InstructionsModule {}

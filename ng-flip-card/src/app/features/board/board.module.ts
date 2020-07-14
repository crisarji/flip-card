import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CardModule } from '@app/features/board/card/card.module';
import { RetryModule } from '@app/features/board/retry/retry.module';
import { BoardComponent } from '@app/features/board/board.component';
import { BoardRoutingModule } from '@app/features/board/board-routing.module';
import { CardListModule } from '@app/features/board/card-list/card-list.module';
import { InstructionsModule } from '@app/features/instructions/instructions.module';

const ngModules = [
  CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule];

const customModules = [
  BoardRoutingModule, CardModule, CardListModule, InstructionsModule, RetryModule];

@NgModule({
  imports: [...ngModules, ...customModules],
  declarations: [BoardComponent],
  exports: [BoardComponent],
})
export class BoardModule { }

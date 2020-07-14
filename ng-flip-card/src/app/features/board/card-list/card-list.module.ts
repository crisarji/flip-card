import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CardModule } from '@app/features/board/card/card.module';
import { CardListComponent } from '@app/features/board/card-list/card-list.component';

const modules = [
  CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, CardModule
];

@NgModule({
  imports: [...modules],
  declarations: [CardListComponent],
  exports: [CardListComponent],
})
export class CardListModule {}

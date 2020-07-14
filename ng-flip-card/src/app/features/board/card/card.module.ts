import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CardComponent } from '@app/features/board/card/card.component';

const modules = [
  CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule
];

@NgModule({
  imports: [...modules],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}

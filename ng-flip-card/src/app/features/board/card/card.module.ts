import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CardComponent } from '@app/features/board/card/card.component';

const modules = [CommonModule, SharedModule, RouterModule];

@NgModule({
  imports: [...modules],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}

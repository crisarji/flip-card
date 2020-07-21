import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { RetryComponent } from '@app/features/board/retry/retry.component';

const modules = [CommonModule, SharedModule, RouterModule];

@NgModule({
  imports: [...modules],
  declarations: [RetryComponent],
  exports: [RetryComponent],
})
export class RetryModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/shared/shared.module';
import { FooterComponent } from '@app/features/core/layout/footer/footer.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}

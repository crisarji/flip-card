import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { LayoutComponent } from '@app/features/core/layout/layout.component';
import { HeaderModule } from '@app/features/core/layout/header/header.module';
import { FooterModule } from '@app/features/core/layout/footer/footer.module';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, HeaderModule, FooterModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}

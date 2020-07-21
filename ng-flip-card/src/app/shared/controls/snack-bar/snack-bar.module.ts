import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/material/material.module';
import { SnackBarComponent } from '@app/shared/controls/snack-bar/snack-bar.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [SnackBarComponent],
  exports: [SnackBarComponent],
  providers: [SnackBarComponent],
})
export class SnackBarModule {}

import { NgModule } from '@angular/core';

import { SnackBarModule } from '@app/shared/controls/snack-bar/snack-bar.module';
import { SnackBarComponent } from '@app/shared/controls/snack-bar/snack-bar.component';

export { SnackBarComponent };

const toExport = [SnackBarModule];

@NgModule({
  imports: [...toExport],
  exports: [...toExport],
})
export class ControlsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/shared/material/material.module';
import { ControlsModule } from '@app/shared/controls/controls.module';

export * from '@app/shared/material/material.module';

const modules = [CommonModule, ControlsModule, MaterialModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}

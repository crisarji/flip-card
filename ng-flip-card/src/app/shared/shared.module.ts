import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/shared/material/material.module';
import { CountdownDirective } from '@app/shared/directives/countdown.directive';

export * from '@app/shared/material/material.module';

const modules = [CommonModule, MaterialModule];
const directives = [CountdownDirective];

@NgModule({
  imports: [...modules],
  exports: [...modules, ...directives],
  declarations: [...directives],

  providers: [],
})
export class SharedModule {}

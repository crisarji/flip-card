import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructionsComponent } from '@app/features/instructions/instructions.component';


export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InstructionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class InstructionsRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from '@app/features/board/board.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BoardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class BoardRoutingModule {}

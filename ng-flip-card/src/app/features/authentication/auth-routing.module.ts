import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '@app/features/authentication/auth.component';

export const routes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AuthRoutingModule {}

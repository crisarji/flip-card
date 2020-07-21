import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { BoardGuard } from '@app/features/core/guards/board.guard';

const redirectLoggedInToInstructions = () => redirectLoggedInTo(['instructions']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@app/features/authentication/auth.module').then(mod => mod.AuthModule),
    ...canActivate(redirectLoggedInToInstructions),
  },
  {
    path: 'instructions',
    loadChildren: () => import('@app/features/instructions/instructions.module').then(mod => mod.InstructionsModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'board',
    loadChildren: () => import('@app/features/board/board.module').then(mod => mod.BoardModule),
    canActivate: [BoardGuard],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

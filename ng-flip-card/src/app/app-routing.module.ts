import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'instructions', pathMatch: 'full' },
  {
    path: 'instructions',
    loadChildren: () => import('@app/features/instructions/instructions.module').then(mod => mod.InstructionsModule)
  },
    {
    path: 'board',
    loadChildren: () => import('@app/features/board/board.module').then(mod => mod.BoardModule)
  },
  { path: '**', redirectTo: 'instructions', pathMatch: 'full' },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesCommandsComponent } from './pages-commands.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: '',
    component: PagesCommandsComponent,
    children: [
      {
        path: 'find',
        loadChildren: () => import('./find/find.module').then((m) => m.FindModule),
      },
      {
        path: 'if',
        loadChildren: () => import('./if/if.module').then((m) => m.IfModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesCommandsRoutingModule {}

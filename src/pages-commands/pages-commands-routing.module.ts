import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesCommandsComponent } from './pages-commands.component';

const routes: Routes = [
  {
    path: '',
    component: PagesCommandsComponent,
    children: [
      {
        path: 'find',
        loadChildren: () => import('./find/find.module').then((m) => m.FindModule),
      },
      {
        path: '**',
        redirectTo: 'find',
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

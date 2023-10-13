import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsLayoutPageComponent } from './commands-layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: CommandsLayoutPageComponent,
    children: [
      {
        path: 'find',
        loadChildren: () => import('../find/find.module').then((m) => m.FindModule),
      },
      {
        path: 'if',
        loadChildren: () => import('../if/if.module').then((m) => m.IfModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandsLayoutPageRoutingModule {}

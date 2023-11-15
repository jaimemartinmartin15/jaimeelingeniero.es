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
      {
        path: 'nmap',
        loadChildren: () => import('../nmap/nmap.module').then((m) => m.NmapModule),
      },
      {
        path: 'cd',
        loadChildren: () => import('../cd/cd.module').then((m) => m.CdModule),
      },
      {
        path: 'host',
        loadChildren: () => import('../host/host.module').then((m) => m.HostModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandsLayoutPageRoutingModule {}

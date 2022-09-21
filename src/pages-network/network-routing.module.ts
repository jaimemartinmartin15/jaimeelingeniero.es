import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dns',
    loadChildren: () => import('./dns/dns.module').then((m) => m.DnsModule),
  },
  {
    path: '**',
    redirectTo: 'dns',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkRoutingModule {}

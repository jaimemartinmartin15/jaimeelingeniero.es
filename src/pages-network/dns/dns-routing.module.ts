import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureDnsServerComponent } from './configure-dns-server/configure-dns-server.component';
import { DnsComponent } from './dns.component';

const routes: Routes = [
  {
    path: 'configurar-un-servidor',
    title: 'Configurar un servidor dns',
    component: ConfigureDnsServerComponent,
    children: [{ path: '**', redirectTo: '' }],
  },
  {
    path: '',
    component: DnsComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DnsRoutingModule {}

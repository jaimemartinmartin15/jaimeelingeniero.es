import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureDnsServerComponent } from './configure-dns-server/configure-dns-server.component';
import { DnsComponent } from './dns.component';

const routes: Routes = [
  {
    path: 'configurar-un-servidor',
    title: 'Configurar un servidor DNS - Redes',
    component: ConfigureDnsServerComponent,
    children: [{ path: '**', redirectTo: '' }],
  },
  {
    path: '',
    title: 'El servicio DNS - Redes',
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

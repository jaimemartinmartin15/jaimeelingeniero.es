import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureDnsServerComponent } from './configure-dns-server/configure-dns-server.component';
import { DnsComponent } from './dns.component';

const routes: Routes = [
  {
    path: 'configurar-un-servidor',
    children: [
      {
        path: '',
        component: ConfigureDnsServerComponent,
        title: 'Configurar un servidor DNS - Redes',
        data: {
          metaTags: {
            description: 'Configuración desde cero de un servidor DNS BIND9.',
            keywords: ['dns', 'servidor', 'configuracion'],
          },
        },
      },
      { path: '**', redirectTo: '' },
    ],
  },
  {
    path: '',
    component: DnsComponent,
    title: 'El servicio DNS - Redes',
    data: {
      metaTags: {
        description: 'Explicación desde cero del sistema de nombres de dominio. Aprende todo sobre este servicio tan usado en internet.',
        keywords: ['dns', 'sistema de nombres de dominio', 'dominio'],
      },
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DnsRoutingModule {}

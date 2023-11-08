import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostComponent } from './host.component';

const routes: Routes = [
  {
    path: '',
    component: HostComponent,
    title: 'host',
    data: {
      metaTags: {
        description: 'Aprende a usar el comando host para realizar consultas al servicio de nombres de dominio.',
        keywords: ['bash', 'comandos', 'dns', 'host'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '8 de noviembre de 2023',
      },
    },
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
export class HostRoutingModule {}

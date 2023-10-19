import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NmapComponent } from './nmap.component';

const routes: Routes = [
  {
    path: '',
    component: NmapComponent,
    title: 'Nmap',
    data: {
      metaTags: {
        description: 'Aprende a usar el comando nmap para escanear redes y puertos.',
        keywords: ['bash', 'comandos', 'nmap', 'escanear', 'redes', 'puertos'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '19 de octubre de 2023', // TODO adjust date
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
export class NmapRoutingModule {}

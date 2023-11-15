import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdComponent } from './cd.component';

const routes: Routes = [
  {
    path: '',
    component: CdComponent,
    title: 'cd',
    data: {
      metaTags: {
        description: 'Aprende a usar el comando cd para moverte por el sistema de ficheros en tu terminal.',
        keywords: ['bash', 'comandos', 'cambiar directorio', 'cd'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '4 de noviembre de 2023',
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
export class CdRoutingModule {}

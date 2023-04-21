import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergeMapComponent } from './merge-map.component';

const routes: Routes = [
  {
    path: '',
    component: MergeMapComponent,
    title: 'MergeMap rxjs',
    data: {
      metaTags: {
        description:
          'Coge cada uno de los elementos emitidos por un Observable fuente y devuelve un nuevo Observable por cada elemento, cuyos elementos emitidos serán puestos de nuevo en el observable fuente y que serán los que se entregen al suscriptor.',
        keywords: ['mergemap', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '20 de abril de 2022',
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
export class MergeMapRoutingModule {}

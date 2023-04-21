import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcatMapComponent } from './concat-map.component';

const routes: Routes = [
  {
    path: '',
    component: ConcatMapComponent,
    title: 'ConcatMap rxjs',
    data: {
      metaTags: {
        description:
          'Coge cada uno de los elementos emitidos por un Observable fuente y devuelve, por orden, un nuevo Observable por cada elemento. Es decir, hasta que no se completa el nuevo Observable, no crea uno nuevo para el siguiente elemento en el Observable fuente. Los elementos del nuevo Observable son puestos en el Obsevable fuente y son entregados al suscriptor.',
        keywords: ['concatmap', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '28 de abril de 2022',
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
export class ConcatMapRoutingModule {}

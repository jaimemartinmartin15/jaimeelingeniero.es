import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExhaustMapComponent } from './exhaust-map.component';

const routes: Routes = [
  {
    path: '',
    component: ExhaustMapComponent,
    title: 'ExhaustMap rxjs',
    data: {
      metaTags: {
        description:
          'Coge cada uno de los elementos emitidos por un Observable fuente y devuelve un nuevo Observable por cada elemento, cuyos elementos emitidos serán puestos de nuevo en el observable fuente y que serán los que se entregen al suscriptor. Los elementos emitidos en el Observable fuente son ignorados si el Observable creado para el elemento anterior aún no ha completado.',
        keywords: ['exhaustmap', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '16 de mayo de 2022',
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
export class ExhaustMapRoutingModule {}

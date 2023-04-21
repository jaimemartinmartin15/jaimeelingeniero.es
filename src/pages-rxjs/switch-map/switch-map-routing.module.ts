import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchMapComponent } from './switch-map.component';

const routes: Routes = [
  {
    path: '',
    component: SwitchMapComponent,
    title: 'SwitchMap rxjs',
    data: {
      metaTags: {
        description:
          'Coge cada uno de los elementos emitidos por un Observable fuente y devuelve un nuevo Observable por cada elemento, cuyos elementos emitidos serán puestos de nuevo en el observable fuente y que serán los que se entregen al subscriptor. En el momento en el que un nuevo elemento es emitido en el Observable fuente, se cancela el Observable creado del elemento anterior y se suscribe al nuevo.',
        keywords: ['switchmap', 'demo', 'rxjs'],
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
export class SwitchMapRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForkJoinComponent } from './fork-join.component';

const routes: Routes = [
  {
    path: '',
    component: ForkJoinComponent,
    title: 'ForkJoin rxjs',
    data: {
      metaTags: {
        description:
          'Toma un array de Observables y nos devuelve un Observable que emite cuando todos los Observables del array han completado. El elemento emitido es un array con los últimos elementos de cada Observable antes de completar.',
        keywords: ['forkjoin', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '18 de mayo de 2022',
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
export class ForkJoinRoutingModule {}

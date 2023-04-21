import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombineLatestWithComponent } from './combine-latest-with.component';

const routes: Routes = [
  {
    path: '',
    component: CombineLatestWithComponent,
    title: 'CombineLatestWith rxjs',
    data: {
      metaTags: {
        description:
          'Crea un nuevo Observable que combina en un array los últimos elementos emitidos por el Observable fuente y los Observables pasados como argumentos, siempre que todos los Observables hayan emitido al menos un elemento.',
        keywords: ['combinelatestwith', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '13 de mayo de 2022',
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
export class CombineLatestWithRoutingModule {}

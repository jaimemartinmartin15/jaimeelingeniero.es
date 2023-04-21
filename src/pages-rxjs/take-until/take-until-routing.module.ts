import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeUntilComponent } from './take-until.component';

const routes: Routes = [
  {
    path: '',
    component: TakeUntilComponent,
    title: 'TakeUntil rxjs',
    data: {
      metaTags: {
        description: 'Deja pasar los elementos del Observable fuente hasta que otro Observable, el notificador, emite algún valor.',
        keywords: ['takeuntil', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '15 de junio de 2022',
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
export class TakeUntilRoutingModule {}

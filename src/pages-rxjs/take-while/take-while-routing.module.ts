import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeWhileComponent } from './take-while.component';

const routes: Routes = [
  {
    path: '',
    component: TakeWhileComponent,
    title: 'TakeWhile rxjs',
    data: {
      metaTags: {
        description:
          'Deja pasar los elementos del Observable fuente mientras cumplan una condición. En el momento que uno de los elementos no cumple la condición el Observable completa.',
        keywords: ['takewhile', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '21 de junio de 2022',
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
export class TakeWhileRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FromComponent } from './from.component';

const routes: Routes = [
  {
    path: '',
    component: FromComponent,
    title: 'From rxjs',
    data: {
      metaTags: {
        description: 'Devuelve un Observable que emite los elementos de un array, o los caracteres de un string, o el resultado de una promesa.',
        keywords: ['from', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '1 de agosto de 2022',
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
export class FromRoutingModule {}

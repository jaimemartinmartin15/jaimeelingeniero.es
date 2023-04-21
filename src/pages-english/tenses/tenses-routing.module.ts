import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RetrieveVerbsResolver } from './retrieve-verbs.resolver';
import { TensesComponent } from './tenses.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      listOfVerbs: RetrieveVerbsResolver,
    },
    children: [
      {
        path: 'lista',
        children: [
          {
            path: '',
            component: ListComponent,
            title: 'Lista de tiempos verbales',
            data: {
              metaTags: {
                description: 'Lista de verbos en inglés para estudiar',
                keywords: ['Verbos', 'ingles', 'infinitivo', 'pasado', 'participio', 'significado'],
              },
            },
          },
          { path: '**', redirectTo: '' },
        ],
      },
      {
        path: '',
        component: TensesComponent,
        title: 'Tiempos verbales',
        data: {
          metaTags: {
            description: 'Repasa los tiempos verbales de los verbos en inglés. Estudia y practica para tus exámenes.',
            keywords: ['tiempos verbales', 'ingles', 'significado', 'infinitivo', 'pasado', 'participio'],
          },
        },
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TensesRoutingModule {}

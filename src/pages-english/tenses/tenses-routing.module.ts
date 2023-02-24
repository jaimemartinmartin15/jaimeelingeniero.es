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
        path: '',
        title: 'Tiempos verbales',
        component: TensesComponent,
        pathMatch: 'full',
      },
      {
        path: 'lista',
        title: 'Lista de tiempos verbales',
        component: ListComponent,
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

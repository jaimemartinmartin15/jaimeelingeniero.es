import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TensesComponent } from './tenses.component';

const routes: Routes = [
  {
    path: '',
    title: 'Tiempos verbales',
    component: TensesComponent,
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
export class TensesRoutingModule {}

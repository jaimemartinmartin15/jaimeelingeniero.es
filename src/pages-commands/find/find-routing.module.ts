import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindComponent } from './find.component';

const routes: Routes = [
  {
    path: '',
    component: FindComponent,
    data: {
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '27 de junio de 2023',
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
export class FindRoutingModule {}

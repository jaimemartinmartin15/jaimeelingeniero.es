import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakeComponent } from './take.component';

const routes: Routes = [
  {
    path: '',
    component: TakeComponent,
    title: 'Take rxjs',
    data: {
      metaTags: {
        description: 'Entrega solamente la primera cantidad de elementos que le digamos.',
        keywords: ['take', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '14 de junio de 2022',
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
export class TakeRoutingModule {}

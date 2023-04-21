import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistinctUntilChangedComponent } from './distinct-until-changed.component';

const routes: Routes = [
  {
    path: '',
    component: DistinctUntilChangedComponent,
    title: 'DistinctUntilChanged rxjs',
    data: {
      metaTags: {
        description: 'Evita que se emitan dos eventos iguales seguidos.',
        keywords: ['distinctuntilchanged', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '10 de junio de 2022',
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
export class DistinctUntilChangedRoutingModule {}

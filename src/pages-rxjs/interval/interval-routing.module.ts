import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntervalComponent } from './interval.component';

const routes: Routes = [
  {
    path: '',
    component: IntervalComponent,
    title: 'Interval rxjs',
    data: {
      metaTags: {
        description: 'Devuelve un Observable que cada intervalo de tiempo que nosotros indiquemos devuelve un número en secuencia ascendente.',
        keywords: ['interval', 'demo', 'rxjs'],
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
export class IntervalRoutingModule {}

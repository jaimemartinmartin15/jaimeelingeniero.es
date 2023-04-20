import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './timer.component';

const routes: Routes = [
  {
    path: '',
    component: TimerComponent,
    title: 'Timer rxjs',
    data: {
      metaTags: {
        description: 'Devuelve un Observable que emite el número 0 pasado el tiempo que le indiquemos o en una fecha concreta.',
        keywords: ['timer', 'demo', 'rxjs'],
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
export class TimerRoutingModule {}

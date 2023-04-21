import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebounceTimeComponent } from './debounce-time.component';

const routes: Routes = [
  {
    path: '',
    component: DebounceTimeComponent,
    title: 'DebounceTime rxjs',
    data: {
      metaTags: {
        description:
          'Espera un tiempo para emitir los elementos del Observable fuente al suscriptor. Si pasado ese tiempo, no se emiten otros elementos, se emite al suscriptor. Si llega otro elemento, el previo se descarta y se reinicia el contador.',
        keywords: ['debouncetime', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '30 de mayo de 2022',
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
export class DebounceTimeRoutingModule {}

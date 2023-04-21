import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartWithComponent } from './start-with.component';

const routes: Routes = [
  {
    path: '',
    component: StartWithComponent,
    title: 'StartWith rxjs',
    data: {
      metaTags: {
        description: 'Emite inmediatamente un nuevo elemento en el pipe del Observable cuando un suscriptor se suscribe.',
        keywords: ['startwith', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '20 de mayo de 2022',
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
export class StartWithRoutingModule {}

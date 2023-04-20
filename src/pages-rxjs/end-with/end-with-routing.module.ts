import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndWithComponent } from './end-with.component';

const routes: Routes = [
  {
    path: '',
    component: EndWithComponent,
    title: 'EndWith rxjs',
    data: {
      metaTags: {
        description: 'Emite inmediatamente un nuevo elemento en el pipe del Observable justo antes de que complete.',
        keywords: ['endwith', 'demo', 'rxjs'],
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
export class EndWithRoutingModule {}

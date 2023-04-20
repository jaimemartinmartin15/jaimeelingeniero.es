import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first.component';

const routes: Routes = [
  {
    path: '',
    component: FirstComponent,
    title: 'First rxjs',
    data: {
      metaTags: {
        description: 'Deja pasar sólo el primer elemento del Observable fuente.',
        keywords: ['first', 'demo', 'rxjs'],
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
export class FirstRoutingModule {}

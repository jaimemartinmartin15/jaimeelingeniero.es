import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistinctComponent } from './distinct.component';

const routes: Routes = [
  {
    path: '',
    component: DistinctComponent,
    title: 'Distinct rxjs',
    data: {
      metaTags: {
        description: 'Solo deja pasar elementos que no se hayan emitido anteriormente.',
        keywords: ['distinct', 'demo', 'rxjs'],
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
export class DistinctRoutingModule {}

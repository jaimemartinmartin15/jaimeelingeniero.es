import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter.component';

const routes: Routes = [
  {
    path: '',
    component: FilterComponent,
    title: 'Filter rxjs',
    data: {
      metaTags: {
        description: 'Sólo deja pasar los elementos que cumplen una condición.',
        keywords: ['filter', 'demo', 'rxjs'],
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
export class FilterRoutingModule {}

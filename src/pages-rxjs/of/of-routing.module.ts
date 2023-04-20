import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfComponent } from './of.component';

const routes: Routes = [
  {
    path: '',
    component: OfComponent,
    title: 'Of rxjs',
    data: {
      metaTags: {
        description: 'Devuelve un Observable que emite los elementos que le pasamos como argumento. Cuando los ha emitido todos, completa.',
        keywords: ['of', 'demo', 'rxjs'],
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
export class OfRoutingModule {}

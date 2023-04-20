import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservableComponent } from './observable.component';

const routes: Routes = [
  {
    path: '',
    component: ObservableComponent,
    title: 'Observable rxjs',
    data: {
      metaTags: {
        description: 'Un Observable es como una cinta transportadora que emite datos...',
        keywords: ['observable', 'demo', 'rxjs'],
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
export class ObservableRoutingModule {}

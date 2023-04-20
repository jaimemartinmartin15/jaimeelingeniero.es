import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkipComponent } from './skip.component';

const routes: Routes = [
  {
    path: '',
    component: SkipComponent,
    title: 'Skip rxjs',
    data: {
      metaTags: {
        description: 'Rechaza totalmente la primera cantidad de elementos que le indiquemos.',
        keywords: ['skip', 'demo', 'rxjs'],
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
export class SkipRoutingModule {}

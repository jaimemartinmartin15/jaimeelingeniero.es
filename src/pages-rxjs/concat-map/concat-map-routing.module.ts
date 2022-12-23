import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcatMapComponent } from './concat-map.component';

const routes: Routes = [
  {
    path: '',
    title: 'ConcatMap rxjs',
    component: ConcatMapComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcatMapRoutingModule {}

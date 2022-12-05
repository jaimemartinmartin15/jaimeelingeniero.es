import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExhaustMapComponent } from './exhaust-map.component';

const routes: Routes = [
  {
    path: '',
    title: 'ExhaustMap rxjs',
    component: ExhaustMapComponent,
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
export class ExhaustMapRoutingModule {}

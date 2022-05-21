import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name) %>Component,
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
export class <%= classify(name) %>RoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

const routes: Routes = [
  {
    path: '',
    component: <%= classify(name) %>Component,
    title: '<%= classify(name) %> rxjs',
    data: {
      metaTags: {
        description: '', // TODO add custom description for this operator
        keywords: ['<%= name %>', 'demo', 'rxjs'],
      },
      headerPrint: {
        author: 'Jaime Martín Martín',
        date: '<%= date %>',
      },
    },
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
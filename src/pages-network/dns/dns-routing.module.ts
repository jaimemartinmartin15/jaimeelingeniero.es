import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DnsComponent } from './dns.component';

const routes: Routes = [
  {
    path: '',
    component: DnsComponent,
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
export class DnsRoutingModule {}

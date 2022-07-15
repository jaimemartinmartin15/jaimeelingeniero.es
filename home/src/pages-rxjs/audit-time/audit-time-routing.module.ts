import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditTimeComponent } from './audit-time.component';

const routes: Routes = [
  {
    path: '',
    component: AuditTimeComponent,
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
export class AuditTimeRoutingModule {}
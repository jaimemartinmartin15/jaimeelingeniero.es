import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnsComponent } from './dns.component';
import { DnsRoutingModule } from './dns-routing.module';

@NgModule({
  imports: [CommonModule, DnsRoutingModule],
  declarations: [DnsComponent],
})
export class DnsModule {}

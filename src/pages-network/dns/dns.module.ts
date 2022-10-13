import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DnsComponent } from './dns.component';
import { DnsRoutingModule } from './dns-routing.module';
import { SoaComponent } from './rr/soa/soa.component';
import { NsComponent } from './rr/ns/ns.component';
import { AComponent } from './rr/a/a.component';
import { AAAAComponent } from './rr/aaaa/aaaa.component';

@NgModule({
  imports: [CommonModule, DnsRoutingModule],
  declarations: [DnsComponent, SoaComponent, NsComponent, AComponent, AAAAComponent],
})
export class DnsModule {}

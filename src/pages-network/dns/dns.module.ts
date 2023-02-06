import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderPrintModule } from 'src/components/header-print/header-print.module';

import { ConfigureDnsServerComponent } from './configure-dns-server/configure-dns-server.component';
import { DnsRoutingModule } from './dns-routing.module';
import { DnsComponent } from './dns.component';

import { AComponent } from './rr/a/a.component';
import { AAAAComponent } from './rr/aaaa/aaaa.component';
import { CnameComponent } from './rr/cname/cname.component';
import { HinfoComponent } from './rr/hinfo/hinfo.component';
import { MxComponent } from './rr/mx/mx.component';
import { NsComponent } from './rr/ns/ns.component';
import { PtrComponent } from './rr/ptr/ptr.component';
import { SoaComponent } from './rr/soa/soa.component';
import { TxtComponent } from './rr/txt/txt.component';
import { WksComponent } from './rr/wks/wks.component';

@NgModule({
  imports: [CommonModule, DnsRoutingModule, HeaderPrintModule],
  declarations: [
    DnsComponent,
    ConfigureDnsServerComponent,
    SoaComponent,
    NsComponent,
    AComponent,
    AAAAComponent,
    MxComponent,
    CnameComponent,
    PtrComponent,
    WksComponent,
    HinfoComponent,
    TxtComponent,
  ],
})
export class DnsModule {}

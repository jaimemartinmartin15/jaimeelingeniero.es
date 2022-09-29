import { Component } from '@angular/core';

@Component({
  selector: 'app-dns',
  templateUrl: './dns.component.html',
  styleUrls: ['./dns.component.scss'],
})
export class DnsComponent {
  public dnsResolvingDomainStep = 0;
}

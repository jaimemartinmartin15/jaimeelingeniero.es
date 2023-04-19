import { Component } from '@angular/core';

@Component({
  selector: 'app-dns',
  templateUrl: './dns.component.html',
  styleUrls: ['./dns.component.scss'],
})
export class DnsComponent {
  public tab = 'SOA';
  public dnsResolvingDomainStep = 0;
  public headerPrintData = {
    author: 'Jaime Martín Martín',
    date: '3 de noviembre de 2022',
  };
}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dns',
  templateUrl: './dns.component.html',
  styleUrls: ['./dns.component.scss'],
})
export class DnsComponent implements OnInit {
  public tab = 'SOA';
  public dnsResolvingDomainStep = 0;
  public headerPrintData = {
    author: 'Jaime Martín Martín',
    date: '3 de noviembre de 2022',
  };

  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit(): void {
    this.titleService.setTitle('El DNS - Redes');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explicación desde cero del sistema de nombres de dominio. Aprende todo sobre este servicio tan usado en internet.',
    });
    this.metaService.updateTag({ name: 'keywords', content: 'dns, sistema de nombres de dominio, dominio' });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}

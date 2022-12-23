import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-configure-dns-server',
  templateUrl: './configure-dns-server.component.html',
  styleUrls: ['./configure-dns-server.component.scss'],
})
export class ConfigureDnsServerComponent implements OnInit, OnDestroy {
  public headerPrintData = {
    author: 'Jaime Martín Martín',
    date: '3 de diciembre de 2022',
  };

  public constructor(private readonly metaService: Meta) {}

  public ngOnInit(): void {
    this.metaService.updateTag({
      name: 'description',
      content: 'Configuración desde cero de un servidor DNS BIND9.',
    });
    this.metaService.updateTag({ name: 'keywords', content: 'dns, servidor, configuración' });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}

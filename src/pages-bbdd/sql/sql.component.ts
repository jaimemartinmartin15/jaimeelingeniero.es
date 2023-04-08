import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss'],
})
export class SqlComponent implements OnInit, OnDestroy {
  // TODO update date when finish
  public headerPrintData = { author: 'Jaime Martín Martín', date: '25 de enero de 2023' };
  public collapsedTables = {
    createTableMechanic: false,
    createTablePropulsion: true,
    createTableBrand: true,
    createTableConcessionaire: true,
    createTableClient: true,
    createTableCar: true,
    createTableOffer: true,
    createTableRepair: true,
    createTableSale: true,
  };

  public constructor(private readonly metaService: Meta) {}

  public ngOnInit(): void {
    this.metaService.updateTag({
      name: 'description',
      content: 'Aprende el lenguaje SQL y su sintáxis con magníficos ejemplos y explicaciones.',
    });
    this.metaService.updateTag({ name: 'keywords', content: 'sql, bases de datos, select, tablas' });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}

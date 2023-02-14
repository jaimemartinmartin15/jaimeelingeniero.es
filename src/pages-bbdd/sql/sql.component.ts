import { Component } from '@angular/core';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss'],
})
export class SqlComponent {
  // TODO update date when finish
  public headerPrintData = { author: 'Jaime Martín Martín', date: '25 de enero de 2023' };
  public collapsedTables = {
    createTableMechanic: false,
    createTableBrand: true,
    createTableConcessionaire: true,
    createTableCar: true,
    createTableRepair: true,
    createTableOffer: true,
    createTableClient: true,
    createTableSale: true,
  }
  public carsTable = [
    { id: 0, brand: 'Renault', name: 'Megane', registration: '0012TER', propulsion: 'Diésel' },
    { id: 1, brand: 'Seat', name: 'Leon', registration: '8435POM', propulsion: 'Diésel' },
    { id: 2, brand: 'Ford', name: 'Fiesta', registration: '1468AEM', propulsion: 'Gasolina' },
    { id: 3, brand: 'Ford', name: 'Focus', registration: '1493UGF', propulsion: 'Diésel' },
    { id: 4, brand: 'Ford', name: 'Transit', registration: '7934HMQ', propulsion: 'Gasolina' },
    { id: 5, brand: 'Renault', name: 'Clio', registration: '8561ÑHB', propulsion: 'Gasolina' },
    { id: 6, brand: 'Seat', name: 'Arona', registration: '7591MIN', propulsion: 'Diésel' },
    { id: 7, brand: 'Citroen', name: 'Cactus', registration: '7543REB', propulsion: 'Gasolina' },
    { id: 8, brand: 'Audi', name: 'A3', registration: '1254UNR', propulsion: 'Diésel' },
    { id: 9, brand: 'Tesla', name: 'Model X', registration: '3495OWZ', propulsion: 'Eléctrico' },
  ];

  // TODO add meta tags
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss'],
})
export class SqlComponent {
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
}

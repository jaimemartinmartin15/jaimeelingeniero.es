import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-trayectory',
  templateUrl: './my-trayectory.component.html',
  styleUrls: ['./my-trayectory.component.scss'],
})
export class MyTrayectoryComponent {
  public constructor(private readonly titleService: Title, private readonly metaService: Meta) {}

  public ngOnInit() {
    this.titleService.setTitle('Trayectoria');
    this.metaService.updateTag({ name: 'description', content: 'Esta es mi carrera profesional hasta hoy' });
    this.metaService.removeTag('name="keywords"');
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-my-trayectory',
  templateUrl: './my-trayectory.component.html',
  styleUrls: ['./my-trayectory.component.scss'],
})
export class MyTrayectoryComponent implements OnInit, OnDestroy {
  public constructor(private readonly metaService: Meta) {}

  public ngOnInit() {
    this.metaService.updateTag({ name: 'description', content: 'Esta es mi carrera profesional hasta hoy' });
    this.metaService.updateTag({ name: 'keywords', content: `jaime martin martin, curriculum` });
  }

  public ngOnDestroy(): void {
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('name="keywords"');
  }
}

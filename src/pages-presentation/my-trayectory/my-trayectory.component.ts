import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-trayectory',
  templateUrl: './my-trayectory.component.html',
  styleUrls: ['./my-trayectory.component.scss'],
})
export class MyTrayectoryComponent {
  @ViewChild('links')
  public linksContainer: ElementRef;

  public toggleNavigationBar() {
    this.linksContainer.nativeElement.classList.toggle('links--show');
  }
}

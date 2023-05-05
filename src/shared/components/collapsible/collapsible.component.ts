import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
})
export class CollapsibleComponent implements AfterViewInit {
  @ViewChild('collapsibleContent', { static: false })
  private collapsibleContent: ElementRef;

  @Input()
  public isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.openCollapsible() : this.closeCollapsible();
  }

  public ngAfterViewInit(): void {
    this.isOpen ? this.openCollapsible() : this.closeCollapsible();
  }

  private openCollapsible() {
    this.collapsibleContent.nativeElement.style.height = this.collapsibleContent.nativeElement.scrollHeight + 'px';
  }

  private closeCollapsible() {
    this.collapsibleContent.nativeElement.style.height = '0px';
  }
}

import { AfterContentInit, Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-image-full-screen',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        inset: 0;
      }
    `,
  ],
})
export class ImageFullScreenComponent implements AfterContentInit {
  public constructor(private readonly elementRef: ElementRef) {}

  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private get imageRef(): HTMLImageElement {
    return this.element.querySelector('img')!;
  }

  public ngAfterContentInit() {
    this.imageRef.style.width = '100%';
    this.imageRef.style.maxWidth = '0%';
    this.imageRef.style.maxHeight = '100%';
    this.imageRef.style.objectFit = 'contain';
    this.imageRef.style.transition = 'all 0.5s';
    this.element.style.backgroundColor = '#0000';
    this.element.style.transition = 'all 0.5s';
    setTimeout(() => {
      this.imageRef.style.maxWidth = '100%';
      this.element.style.backgroundColor = '#000E';
    }, 0);
  }

  @HostListener('click')
  public onClick() {
    this.element.parentElement?.removeChild(this.element);
  }
}

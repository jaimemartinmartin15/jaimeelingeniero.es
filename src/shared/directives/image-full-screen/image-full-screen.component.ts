import { AfterContentInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs';

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
export class ImageFullScreenComponent implements OnInit, AfterContentInit {
  private currentScroll: number;

  public constructor(private readonly elementRef: ElementRef, private readonly router: Router) {}

  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private get imageRef(): HTMLImageElement {
    return this.element.querySelector('img')!;
  }

  public ngOnInit(): void {
    this.currentScroll = window.scrollY;

    // when the user presses back, we want to avoid navigation back. Just close the image.
    // adding the hash will just remove it when navigating back (user presses back button)
    location.href += '#image';
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        skip(1)
      )
      .subscribe(() => {
        this.closeImage();
      });
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
    this.closeImage();
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    this.closeImage();
  }

  private closeImage(): void {
    this.element.parentElement?.removeChild(this.element);
    // restore the scroll after navigating back
    setTimeout(() => window.scrollTo({ top: this.currentScroll }), 0);
  }
}

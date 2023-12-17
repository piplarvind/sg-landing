// nav-scroll.directive.ts
import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNavScroll]'
})
export class NavScrollDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Add the 'nav-scroll' class when scrolled, and remove it when at the top
    if (scrollY > 0) {
      this.renderer.addClass(this.el.nativeElement, 'nav-scroll');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'nav-scroll');
    }
  }
}

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

// ng generate directive better-highlight/better-highlight --skip-tests

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective /*implements OnInit */ {
  constructor(private elementRef : ElementRef, private renderer: Renderer2) {
    // elementRef is the element this attribute was placed in
  }

  // ngOnInit() {
  //   this.renderer.setStyle(
  //     this.elementRef.nativeElement,
  //     'background-color',
  //     'blue');
  // }

  // Turns blue when hovered over
  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'blue');
  }

  // Stops being blue when you stop hovering over it
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'transparent');
  }
}

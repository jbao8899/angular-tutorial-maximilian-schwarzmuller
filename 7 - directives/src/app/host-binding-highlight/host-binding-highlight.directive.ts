import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

// ng generate directive better-highlight/better-highlight --skip-tests

@Directive({
  selector: '[appHostBindingHighlight]'
})
export class HostBindingHighlightDirective {
  // Host binding lets you avoid having to use the renderer
  // So with this, what we're telling Angular is on the element this directive sits,
  // please access the style property and set it to whatever we set this.backgroundColor to
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  constructor(private elementRef: ElementRef) {  }

  // Turns orange when hovered over
  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.backgroundColor = 'orange';
  }

  // Stops being orange when you stop hovering over it
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
  }
}

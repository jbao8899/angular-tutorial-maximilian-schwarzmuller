import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomPropertyBindingHighlight]'
})
export class CustomPropertyBindingHighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";
  @Input('appCustomPropertyBindingHighlight') highlightColor: string = "red";

  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

  constructor(private elementRef: ElementRef) {  }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  // Turns orange when hovered over
  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  // Stops being orange when you stop hovering over it
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}

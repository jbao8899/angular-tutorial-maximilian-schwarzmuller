import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
    constructor(private elementRef : ElementRef) {
        // elementRef is the element this attribute was placed in
    }

    ngOnInit() {
        // Accessing elements directly in TypeScript like this is not good
        // It may fail if not run in browser, if something like that
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}
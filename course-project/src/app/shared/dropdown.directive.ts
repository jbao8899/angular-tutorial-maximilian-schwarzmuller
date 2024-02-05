import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor(private elRef: ElementRef) {}

    // Copied, will close if you click anywhere on page
    @HostListener('document:click', ['$event'])
    toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    // Version written during video:
    // @HostListener('click')
    // toggleOpen(eventData: Event) {
    //     this.isOpen = !this.isOpen;
    // }
}

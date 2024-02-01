import { Component, EventEmitter, Output } from '@angular/core';

// It would be acceptable to put this directly into the app folder, instead of into its own folder
@Component({
    selector: 'app-header', 
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    collapsed = true;
    @Output() pageSelection = new EventEmitter<string>();

    onSelect(page : string) {
        this.pageSelection.emit(page);
    }
}
  
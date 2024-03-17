import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css'
})
export class AlertComponent {
    // @Input means you can set the message from outside
    @Input() message: string;
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}

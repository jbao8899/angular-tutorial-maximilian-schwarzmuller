import { Component, /*EventEmitter,*/ Input /*, Output*/ } from '@angular/core';
import { LoggingService } from '../shared/logging.service';
import { AccountsService } from '../shared/accounts.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [/*AccountsService, putting this here overwrites the ones we get from app.module.ts*/
        /*LoggingService*/] // Must put services here to inject them
})
export class AccountComponent {
    @Input() account: {name: string, status: string};
    @Input() id: number;
    // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

    constructor(private accountsService: AccountsService) { }

    onSetTo(status: string) {
        // this.statusChanged.emit({id: this.id, newStatus: status});

        // With accountsService, we can update the array directly
        this.accountsService.updateStatus(this.id, status);

        // // console.log('A server status changed, new status: ' + status);
        // this.loggingService.logStatusChange(status);

        this.accountsService.statusUpdated.emit(status);
    }
}

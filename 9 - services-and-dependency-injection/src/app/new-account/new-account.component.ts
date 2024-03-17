import { Component /*, EventEmitter, Output*/ } from '@angular/core';
import { LoggingService } from '../shared/logging.service';
import { AccountsService } from '../shared/accounts.service';

@Component({
    selector: 'app-new-account',
    templateUrl: './new-account.component.html',
    styleUrls: ['./new-account.component.css'],
    providers: [/*AccountsService, putting this here overwrites the ones we get from app.module.ts*/
        /*LoggingService*/] // Must put services here to inject them
})
export class NewAccountComponent {
    // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

    // Must record type of logging service
    constructor(private accountsService: AccountsService) {
        this.accountsService.statusUpdated.subscribe(
            (status: string) => {
                alert("New Status: " + status)  
            }
        ); // listen for event emitted in account component -> CROSS-COMPONENT COMMUNICATION
    }

    onCreateAccount(accountName: string, accountStatus: string) {
        // this.accountAdded.emit({
        //   name: accountName,
        //   status: accountStatus
        // });

        // With accountsService, you can add to array directly
        this.accountsService.addAccount(accountName, accountStatus);

        // console.log('A server status changed, new status: ' + accountStatus);
        // this.loggingService.logStatusChange(accountStatus);
    }
}

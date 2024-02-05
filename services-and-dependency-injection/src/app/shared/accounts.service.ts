import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

// @Injectable({providedIn: 'root'}) is the same as adding this to providers array
// in app.module.ts

// Need this annotation to inject the logging service into this
@Injectable() 
export class AccountsService {
    // Data service that stores the accounts
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
    ];
    statusUpdated = new EventEmitter<string>();

    constructor(private loggingService: LoggingService) { }
    
    addAccount(setName: string, setStatus: string) {
        this.loggingService.logStatusChange(setStatus);
        this.accounts.push({name: setName, status: setStatus});
    }

    updateStatus(id: number, setStatus: string) {
        this.loggingService.logStatusChange(setStatus);
        this.accounts[id].status = setStatus;
    }
}
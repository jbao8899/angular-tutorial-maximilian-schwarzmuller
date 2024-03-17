import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

// Need this annotation to inject the counter service into this
@Injectable() 
export class UsersService {
    activeUsers: string[] = ["Max", "Anna"];
    inactiveUsers: string[] = ["Chris", "Manu"];

    constructor(private counterService: CounterService) { }

    activateUser(id: number) {
        let user = this.inactiveUsers[id];
        this.inactiveUsers.splice(id, 1);
        this.activeUsers.push(user);
        this.counterService.logNumActivations();
    }

    inactivateUser(id: number) {
        let user = this.activeUsers[id];
        this.activeUsers.splice(id, 1);
        this.inactiveUsers.push(user);
        this.counterService.logNumDeactivations();
    }
}
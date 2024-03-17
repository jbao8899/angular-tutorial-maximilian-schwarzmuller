import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    userActivated = false;
    emitterSubscription: Subscription;
    subjectSubscription: Subscription;

    constructor(private userService: UserService) {}

    ngOnInit() {
        // using event emitter (currently commented out in the user component)
        // this.userService.activatedEmitter.subscribe(
        //     isActivated => {
        //         this.userActivated = isActivated;
        //     }
        // )

        // using subject (preferred)
        this.userService.activatedSubject.subscribe(
            isActivated => {
                this.userActivated = isActivated;
            }
        )
    }

    ngOnDestroy(): void {
        this.emitterSubscription.unsubscribe();

        this.subjectSubscription.unsubscribe();
    }
}

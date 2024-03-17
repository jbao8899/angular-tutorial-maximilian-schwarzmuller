import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    id: number;
    activated: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService) {
    }

    ngOnInit() {
        // params is an observable
        // It is a stream that notifies you of changing parameters
        this.route.params.subscribe((params: Params) => {
        this.id = +params.id;
        });
    }

    onToggleActivation() {
        this.activated = !this.activated;
        
        // using emitter
        // this.userService.activatedEmitter.emit(this.activated);

        // Using subject
        // It is more active. You can call next on it from outside???
        // Subjects are recommended over event emitters
        // Do not use it unless you have a service of some sort
        // Do not use it for Event Emitters decorated with @Output(), only for those
        // used for cross-component communication
        this.userService.activatedSubject.next(this.activated);
    }
}

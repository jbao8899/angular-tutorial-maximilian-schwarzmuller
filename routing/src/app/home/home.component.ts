import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Inject the router
    constructor(
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
    }

    onLoadServers() {
        // Maybe we don't use routerLink because we have some computations or something here

        // Programatically routing to another page without reloading
        this.router.navigate(['/servers']);
    }

    onLoadServer(id: number) {
        this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
    }

    onLogIn() {
        this.authService.logIn();
    }

    onLogOut() {
        this.authService.logOut();
    }
}

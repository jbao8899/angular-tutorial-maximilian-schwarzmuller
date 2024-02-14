import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrl: './error-page.component.css'
})
export class ErrorPageComponent implements OnInit {
    errorMessage: string = "Default Error Message (Should not see this.)";

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Linked to data: {message: "Route not found!"} in app-routing.module.ts
        this.errorMessage = this.route.snapshot.data['message'];

        // Deal with possible changes
        this.route.data.subscribe(
            (data: Data) => {
                this.errorMessage = data['message'];
            }
        );
    }
}

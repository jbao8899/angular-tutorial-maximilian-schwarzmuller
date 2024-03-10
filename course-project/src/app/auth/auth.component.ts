import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode: boolean = true;
    areLoading: boolean = false;
    errorMessage: string = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        // console.log(authForm.value);
        if (authForm.invalid) {
            // Although we disable the submit button  if the form is invalid,
            // the user may change that
            // They could still make the page valid when it isn't, though
            return; 
        }

        this.areLoading = true;

        const email = authForm.value.email;
        const password = authForm.value.password;

        let authObs: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authObs = this.authService.logIn(email, password);
        }
        else {
            authObs = this.authService.signUp(email, password); 
        }

        authObs.subscribe(
            (responseData) => {
                console.log(responseData);
                this.areLoading = false;
                this.router.navigate(['recipes']); // Causes error, even when account creation is successful????? -> Because haven't set up process to send key
            },
            (errorMessage) => {
                console.log(errorMessage);
                this.errorMessage = errorMessage;
                this.areLoading = false;
            }
        )
        authForm.reset();
    }
}
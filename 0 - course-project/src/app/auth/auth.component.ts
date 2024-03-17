import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode: boolean = true;
    areLoading: boolean = false;
    errorMessage: string = null;

    private closePopUpSub: Subscription = null;

    // Will find the first time appPlaceholder appears in the DOM
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective; 

    constructor(
        private authService: AuthService,
        private componentFactoryResolver: ComponentFactoryResolver,
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

                // For programatically generating pop up (prefer ngIf over this when possible)
                this.showErrorAlert(errorMessage);
            }
        )
        authForm.reset();
    }

    onHandleError() {
        this.errorMessage = null;
    }

    private showErrorAlert(message: string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;

        // Clear anything that may already be there
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        // New method, don't need component factory
        // hostViewContainerRef.createComponent<AlertComponent>(AlertComponent)

        componentRef.instance.message = message;
        this.closePopUpSub = componentRef.instance.close.subscribe(
            () => {
                this.closePopUpSub.unsubscribe();
                hostViewContainerRef.clear()
            }
        );
    }

    ngOnDestroy(): void {
        if (this.closePopUpSub) {
            this.closePopUpSub.unsubscribe();
        }
    }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router) {
        
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        
        // console.log("GOT HERE"); // Yes, got here

        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        // console.log("authenticated is true");
                        return true;
                    }
                    else {
                        // console.log("authenticated is false");
                        this.router.navigate(['/']);

                        return false; // Not needed?
                    }
                }
            )
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
            return this.canActivate(route, state);
        }
}
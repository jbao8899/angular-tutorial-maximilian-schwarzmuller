import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        boolean | Observable<boolean | UrlTree> | Promise<boolean> {
        return this.authService.user.pipe(
            take(1), // get the latest value and then unsubscribe
            map(
                (user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        return this.router.createUrlTree(['/auth']);
                    }
                }
            )
        ); // This is an observable
    }
}
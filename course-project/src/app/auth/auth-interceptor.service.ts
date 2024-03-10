import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
// import { take } from "rxjs-compat/operator/take"; // WRONG!!!!!
// import { exhaustMap } from "rxjs-compat/operator/exhaustMap"; 
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) {

    }

    // Will be used when storing or retrieving recipes
    intercept(req: HttpRequest<any>, next: HttpHandler) :
        Observable<HttpEvent<any>> {

        return this.authService.user.pipe(
            take(1),
            exhaustMap(
                user => {
                    if (!user) {
                        return next.handle(req); // Don't need this when logging in. Could also check URLs
                    }
    
                    const modifiedRequest = req.clone(
                        {
                            params: new HttpParams().set("auth", user.token)
                        }
                    );
                    return next.handle(modifiedRequest);
                }
            )
        )
    }
}
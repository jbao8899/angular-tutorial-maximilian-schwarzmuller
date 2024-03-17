import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

// We want to add some sort of header for authentication to every outgoing request
// (Here, there is no authentication, and this is just for demonstration)

export class AuthInterceptorService implements HttpInterceptor {
    
    // By adding this to the providers array of app.module.ts, intercept()
    // will be called for all requests
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        // next is a function you call to let the request continue its journey

        // can check req.url, req.headers, req.method, etc. to avoid doing anything in some cases
        
        // console.log("Request is on its way.");
        // console.log(req.method);

        const modifiedRequest = req.clone({
            // can overwrite things
            // url: 'new url',
            // headers: // Can take req.headers and append things
            // can set new params
            headers: req.headers.append('Auth', 'xyz')
        });

        return next.handle(modifiedRequest) // Let the request continue
            .pipe(tap(
                (event) => {
                    // console.log(event);

                    // if (event.type == HttpEventType.Response) {
                    //     console.log("Response arrived. Body data:")
                    //     console.log(event.body);
                    // }
                }
            ))
    }
}
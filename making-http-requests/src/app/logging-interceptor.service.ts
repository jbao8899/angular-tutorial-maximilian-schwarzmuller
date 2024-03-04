import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class LoggingInterceptorService implements HttpInterceptor {
    
    // By adding this to the providers array of app.module.ts, intercept()
    // will be called for all requests
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        console.log('Outgoing request');
        console.log(req.url);
        console.log(req.headers); // Contains "Auth": ["xyz"], because this is run after AuthInterceptorService 

        return next.handle(req)
            .pipe(tap(
                (event) => {
                    if (event.type === HttpEventType.Response) {
                        console.log("Incoming Response");
                        console.log(event.body);
                    }
                }
            ));
    }
}
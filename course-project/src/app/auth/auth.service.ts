import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    // user = new Subject<User>();

    // Like regular subject, but you can also fetch last-emitted value
    user = new BehaviorSubject<User>(null);

    constructor(
        private http: HttpClient,
        private router: Router
    ) {

    }

    signUp(email: string, password: string) {
        // Return without actually making the request, subscribe outside
        return this.http.post<AuthResponseData>( // We will get a response in this format
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
                params: new HttpParams().set('key', 'AIzaSyBkTcwE2eTdVdrNRkG5QKwA7CE3KxuVxuA'),
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(
                (resData) => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }
            )
        );
    }

    logIn(email: string, password: string) {
        // console.log("GOT HERE")
        return this.http.post<AuthResponseData>( // We will get a response in this format
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
                params: new HttpParams().set('key', 'AIzaSyBkTcwE2eTdVdrNRkG5QKwA7CE3KxuVxuA'),
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(
                (resData) => {
                    this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }
            )
        );
    }

    logOut() {
        this.user.next(null); // set it to null, no longer authenticated
        this.router.navigate(['/auth'])
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        // resData.expiresIn is in seconds, must multiply by 1000 to get milliseconds
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred.";

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "There is already an account using this email address";
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = "Those credentials are invalid.";
                // This gets returned for both nonexistent account and wrong password???
                break;
        }
        
        return throwError(errorMessage);
    }
}
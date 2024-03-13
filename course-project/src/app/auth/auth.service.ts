import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment.development";

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

    private tokenExpirationTimer: any = null;

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
                params: new HttpParams().set('key', environment.firebaseAPIKey),
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
                params: new HttpParams().set('key', environment.firebaseAPIKey),
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
        this.router.navigate(['/auth']);
        localStorage.removeItem("userData");

        if (this.tokenExpirationTimer) {
            // if we have a timer, disable it.
            // So the next user won't get forcibly logged out early
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

    // expirationDuration -> number of milliseconds until token is invalid
    // log out automatically after that time
    autoLogOut(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(
            () => {
                this.logOut();
            },
            expirationDuration
            // 2000
        )
    }

    autoLogIn() {
        const userData: {
            email: string
            id: string,
            _token: string,
            _tokenExpirationDate: string
        }
            = JSON.parse(localStorage.getItem("userData"));

        if (!userData) { 
            // Were not logged in before refreshing
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            // The getter for token checks the expiration date to see if it exists and is in the future
            this.user.next(loadedUser);

            // Difference between time when the token expires and right now
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration); // log out after this many milliseconds
        }
        else {
            // This branch is not shown in the video and may be unnecessary???
            this.user.next(null);
        }
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        // resData.expiresIn is in seconds, must multiply by 1000 to get milliseconds
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))
        const user = new User(email, userId, token, expirationDate);

        this.user.next(user);
        this.autoLogOut(expiresIn * 1000); // log out after this many milliseconds

        // Persist the login
        // Can see this in Application > Local storage in the Chrome devtools  
        localStorage.setItem('userData', JSON.stringify(user));
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
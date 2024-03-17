export class AuthService {
    // this is fake service, would allow logging-in within a real app

    loggedIn = false;

    logIn() {
        this.loggedIn = true;
    }

    logOut() {
        this.loggedIn = false;
    }

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                },
                800); // wait 800 milliseconds
            }
        );

        return promise;
    }
}
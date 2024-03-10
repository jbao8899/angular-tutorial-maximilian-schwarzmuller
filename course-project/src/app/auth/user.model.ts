export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {

    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            // If there is no token expiration date (it is null) or if is before the current date (new Date()),
            // then we have no valid token
            return null;
        }   
        else {
            return this._token;
        }
    }
}
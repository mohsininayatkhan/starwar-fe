export class User {
    constructor(
        public id: number,
        public email: string,
        public name: string,
        private token: string,
        private _tokenExpiryDate: Date
    ) {}    
}
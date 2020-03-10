export class User {
    constructor(
        public id: number,
        public email: string,
        public name: string,        
        public token: string,
        public _tokenExpiryDate: Date,
        public profile_picture?: string,
        public gender?: string, 
        public profession?: string
    ) {}   
    
    getToken() {
        return this.token;
    }
}
import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';
import { UserRegisteration } from '../models/user-registeration.model'
 
@Injectable()
export class AuthService
{ 
    error = new Subject<string>();
    constructor(private http: HttpClient){}

    register(name: string, email: string, password: string, confirmPassword: string)
    {
        const body = {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword
        };
        return this.http.post(apiPaths.auth.register, body);
    }    
}
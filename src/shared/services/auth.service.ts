import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import * as RegisterModels from 'src/shared/models/auth/register.models';
import { User } from '../models/auth/user.model';

 
@Injectable()
export class AuthService
{     
    constructor(private http: HttpClient){}

    register(request: RegisterModels.RegiserRequest)
    {
        /*const body: RegisterModels.RegiserRequest = {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword
        };*/
        return this.http.post(apiPaths.auth.register, request);
    }
    
    /*static store(user: User) {
        localStorage.setItem('me', JSON.stringify(user));
    }*/
}
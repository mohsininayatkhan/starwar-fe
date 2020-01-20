import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import * as RegisterModels from 'src/shared/models/auth/register.models';
import { AppState } from 'src/shared/store/states/app.state';
import { User } from '../models/auth/user.model';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
 
@Injectable()
export class AuthService
{     
    constructor(private http: HttpClient, private store: Store<AppState>){}

    register(request: RegisterModels.RegiserRequest)
    {     
        return this.http.post(apiPaths.auth.register, request);
    }

    isAuthenticated()
    {
        let authenticated: boolean = false;

        this.store.select('auth').pipe(map(authState => authState.user))
        .subscribe(user=> {
            if(user!= null) {
                authenticated = true;
            }
        });
        return authenticated;
    }

    getStoreUser()
    {
        return this.store.select('auth').pipe(map(authState => authState.user));
    }
    
    static store(user: User) {
        localStorage.setItem('me', JSON.stringify(user));
    }

    static getLocalStorageUser()
    {
        return localStorage.getItem('me');
    }


}
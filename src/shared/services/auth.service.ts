import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import * as AuthModels from 'src/shared/models/auth/auth.models';
import { AppState } from 'src/shared/store/states/app.state';
import { User } from '../models/auth/user.model';
import { Store} from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from 'src/shared/store/actions/auth.actions';
import { HttpHeaders } from '@angular/common/http';
 
@Injectable()
export class AuthService
{     
    constructor(private http: HttpClient, private store: Store<AppState>) {}

    register(request: AuthModels.RegiserRequest)
    {     
        return this.http.post(apiPaths.auth.register, request);
    }

    login(request: AuthModels.LoginRequest)
    {     
        return this.http.post(apiPaths.auth.login, request);
    }

    uploadPhoto(request: AuthModels.UploadPhotoRequest)
    {
        let token = '';
        const user = this.getLocalStorageUser();    
        
        if(user!= null) {
            token = user.token;
        }

        const formData: FormData = new FormData();
        formData.append('photo', request.photo, request.photo.name);

        const httpOptions = {
            headers: new HttpHeaders({                
                'Authorization': 'Bearer ' + token
            })
        };      
        return this.http.post(apiPaths.auth.uploadPhoto, formData, httpOptions);
    }

    updateProfile(request: AuthModels.UpdateProfileRequest)
    {
        let token = '';
        const user = this.getLocalStorageUser();    
        
        if(user!= null) {
            token = user.token;
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + token
            })
        };        
        return this.http.post(apiPaths.auth.updateProfile, request, httpOptions);
    }

    logout()
    {
        let token = '';
        const user = this.getLocalStorageUser();    
        
        if(user!= null) {
            token = user.token;
        }

        let request = {};

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
        return this.http.post(apiPaths.auth.logout, request, httpOptions);
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
    
    storeLocalStorageUser(user: User) {
        localStorage.setItem('me', JSON.stringify(user));
    }

    clearLocalStorageUser() {
        localStorage.removeItem('me');
    }

    getLocalStorageUser()
    {
        return JSON.parse(localStorage.getItem('me'));
    }

    autLogin() {
        this.store.dispatch(new AuthActions.AutoLogin());
    }
}
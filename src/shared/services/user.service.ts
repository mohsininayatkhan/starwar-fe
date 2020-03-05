import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { catchError } from 'rxjs/operators';
import * as ProfileModels from  'src/shared/models/profile/profile.models';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
 
@Injectable()
export class UserService
{     
    
    //public user: BehaviorSubject<ProfileModels.Profile>;
    public user: BehaviorSubject<ProfileModels.Profile>;
    
    constructor(
        private http: HttpClient, 
        private errorHandler: ErrorHandlerService,
        private auth: AuthService
    ) {
        this.user = new BehaviorSubject<ProfileModels.Profile>(null);
    }

    getPosts(url: string)
    {     
        return this.http.get(url)
        .pipe(
            catchError(error => {
                const errorResponse: ProfileModels.ProfileErrorResponse = this.errorHandler.getPostErrors(error);
                return throwError(errorResponse);
            })
        );
    }  
    
    getProfile(id: number)
    {        
        return this.http.get(apiPaths.user.profile.get.replace('{id}', id.toString()))
        .pipe(
            catchError(error => {
                const errorResponse: ProfileModels.ProfileErrorResponse = this.errorHandler.getPostErrors(error);
                return throwError(errorResponse);
            })
        );
    }

    getUser()
    {
        return this.user;
    }
    
    setUser(user: ProfileModels.Profile)
    {
        this.user.next(user);
    }
}
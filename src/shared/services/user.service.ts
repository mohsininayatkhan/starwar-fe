import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import * as PostModels from  'src/shared/models/timeline/post.models';
import * as ProfileModels from  'src/shared/models/profile/profile.models';
import { of, throwError } from 'rxjs';
import { User } from '../models/auth/user.model';

 
@Injectable()
export class UserService
{     
    private userId: number;
    
    constructor(
        private http: HttpClient, 
        private errorHandler: ErrorHandlerService,
        private auth: AuthService
    ) {}

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
        let token = '';
        const user = this.auth.getLocalStorageUser();
        
        if (user!= null) {
            token = user.token;
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + token
            })
        };        

        return this.http.get(apiPaths.user.profile.get.replace('{id}', id.toString()), httpOptions)
        .pipe(
            catchError(error => {
                const errorResponse: ProfileModels.ProfileErrorResponse = this.errorHandler.getPostErrors(error);
                return throwError(errorResponse);
            })
        );
    }

    setUserId(userId)
    {
        this.userId = userId;
    }

    getUserId()
    {
        return this.userId;
    }
}
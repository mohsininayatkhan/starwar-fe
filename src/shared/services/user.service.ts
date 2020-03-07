import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { catchError } from 'rxjs/operators';
import * as ProfileModels from  'src/shared/models/profile/profile.models';
import * as PostModels from  'src/shared/models/timeline/post.models';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
 
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
        return this.http.get<ProfileModels.Profile>(apiPaths.user.profile.get.replace('{id}', id.toString()))
        .pipe(
            catchError(error => {
                const errorResponse: ProfileModels.ProfileErrorResponse = this.errorHandler.getPostErrors(error);
                return throwError(errorResponse);
            })
        );
    }

    removePost(id: number)
    {
        let token = '';
        const user = this.auth.getLocalStorageUser();
        
        if(user!= null) {
            token = user.token;
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + token
            })
        };        
        return this.http.delete(apiPaths.timeline.post.deletePost.replace('{id}', id.toString()), httpOptions)
        .pipe(
            catchError(error => {
                const errorResponse: PostModels.PostErrorResponse = this.errorHandler.getPostErrors(error);
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
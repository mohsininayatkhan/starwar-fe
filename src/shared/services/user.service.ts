import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import * as PostModels from  'src/shared/models/timeline/post.models';
import { of, throwError } from 'rxjs';

 
@Injectable()
export class UserService
{     
    constructor(private http: HttpClient, private errorHandler: ErrorHandlerService ) {}

    getPosts(url: string)
    {     
        return this.http.get(url)
        .pipe(
            catchError(error => {
                const errorResponse: PostModels.PostErrorResponse = this.errorHandler.getPostErrors(error);
                return throwError(errorResponse);
            })
        );
    }    
}
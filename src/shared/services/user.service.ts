import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
 
@Injectable()
export class UserService
{     
    constructor(private http: HttpClient) {}

    getPosts(url: string)
    {     
        return this.http.get(url)
        .pipe(
            catchError(errorRes => {                
                return throwError(errorRes);
            })
        );
    }    
}
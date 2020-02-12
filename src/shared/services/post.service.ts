import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { CreatePostRequest } from 'src/shared/models/timeline/post.models';
import { AuthService } from 'src/shared/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/shared/models/auth/user.model';
 
@Injectable()
export class PostService
{     
    constructor(private http: HttpClient, private auth: AuthService){}

    getAll() {     
        return this.http.get(apiPaths.timeline.post.getAllPosts);
    }

    createPost(request: CreatePostRequest) {
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
        
        return this.http.post(apiPaths.timeline.post.createPost, request, httpOptions);
    }
}
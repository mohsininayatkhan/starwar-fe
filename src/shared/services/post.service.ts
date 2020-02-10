import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';

 
@Injectable()
export class PostService
{     
    constructor(private http: HttpClient){}

    getAll()
    {     
        return this.http.get(apiPaths.timeline.post.getAllPosts);
    }
}
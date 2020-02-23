import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { CreatePostRequest, UploadPhotosRequest } from 'src/shared/models/timeline/post.models';
import { AuthService } from 'src/shared/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
 
@Injectable()
export class PostService
{     
    constructor(private http: HttpClient, private auth: AuthService) {}

    getAll(url: string)
    {     
        return this.http.get(url);
    }

    createPost(request: CreatePostRequest) 
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
        return this.http.post(apiPaths.timeline.post.createPost, request, httpOptions);
    }

    uploadPostPhotos(request: UploadPhotosRequest)
    {
        //debugger;
        let token = '';
        const user = this.auth.getLocalStorageUser();
        
        if(user!= null) {
            token = user.token;
        }

        const formData: FormData = new FormData();
        //formData.append('photos', request.photos);
        for (var i = 0; i < request.photos.length; i++) { 
            formData.append('photos[]', request.photos[i]);
        }

        const httpOptions = {
            headers: new HttpHeaders({                
                'Authorization': 'Bearer ' + token
            })
        };      
        return this.http.post(apiPaths.timeline.post.uploadPhotos, formData, httpOptions);        
    }
}
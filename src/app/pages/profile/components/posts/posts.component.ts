import { Component, OnInit } from '@angular/core';
import * as PostModels from  'src/shared/models/timeline/post.models';
import { UserService } from 'src/shared/services/user.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { apiPaths } from 'src/shared/parameters/backend-endpoints';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'profile-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit 
{
    private postResponse: PostModels.PostSuccessResponse;

    constructor(        
        private userService: UserService,
        private toastr: ToastrService, 
        private errorHandler: ErrorHandlerService) 
    {}

    ngOnInit()
    {
        this.getUserPosts();
    }
    
    getUserPosts()
    {
        this.userService.getPosts(apiPaths.user.post.getAllPosts.replace('{id}', '1'))
        .subscribe((response: PostModels.PostSuccessResponse)=> {            
            this.postResponse = response;            
        },error => {
            this.showErrors(error);
        });
    }

    showErrors(errorResponse: PostModels.PostErrorResponse) 
    {  
        if(errorResponse.errors==null) {
            this.toastr.error('Sorry!', errorResponse.message);
        } else {
            errorResponse.errors.forEach(element => {                        
                this.toastr.error(errorResponse.message, element);
            });
        }
    }
}
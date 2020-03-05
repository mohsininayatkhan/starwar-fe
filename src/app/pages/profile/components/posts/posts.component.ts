import { Component, OnInit } from '@angular/core';
import * as PostModels from  'src/shared/models/timeline/post.models';
import * as ProfileModels  from 'src/shared/models/profile/profile.models';
import { AuthService } from 'src/shared/services/auth.service';
import { UserService } from 'src/shared/services/user.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { apiPaths } from 'src/shared/parameters/backend-endpoints';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'profile-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit
{
    private postResponse: PostModels.PostSuccessResponse;
    
    private posts: BehaviorSubject<PostModels.Post[]>;
    private authUser = null;    
    private isAuthenticated = false;
    private userProfile: ProfileModels.Profile;

    constructor(        
        private userService: UserService,
        private authService: AuthService, 
        private toastr: ToastrService, 
        private errorHandler: ErrorHandlerService) 
    {
        this.posts = new BehaviorSubject<PostModels.Post[]>([]);
        this.userProfile = null;
    }

    ngOnInit()
    {
        this.userService.getUser().subscribe(profile => {
            this.userProfile = profile;
            if (this.userProfile != null) {
                this.getUserPosts(apiPaths.user.post.getAllPosts.replace('{id}', this.userProfile.id.toString()));
                this.isAuthenticated = this.authService.isAuthenticated();

                if (this.isAuthenticated) {
                    this.authService.getStoreUser().subscribe(user => {
                        this.authUser = user;
                    });
                }
            }
        });     
    }    

    onScroll()
    {   
        if(this.postResponse.next_page_url != null) {
            this.getUserPosts(this.postResponse.next_page_url);
        }
    }
    
    getUserPosts(url: string)
    {
        this.userService.getPosts(url)
        .pipe(
            take(1)
        )
        .subscribe((response: PostModels.PostSuccessResponse)=> {            
            this.postResponse = response;
            const allPosts = [...this.posts.value, ...this.postResponse.data];
            this.posts.next(allPosts);
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
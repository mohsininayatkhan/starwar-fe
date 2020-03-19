import { Component, OnInit } from '@angular/core';
import * as PostModels from  'src/shared/models/timeline/post.models';
import * as ProfileModels  from 'src/shared/models/profile/profile.models';
import { AuthService } from 'src/shared/services/auth.service';
import { UserService } from 'src/shared/services/user.service';
import { PostService } from 'src/shared/services/post.service';
import { apiPaths } from 'src/shared/parameters/backend-endpoints';
import { ToastrService } from 'ngx-toastr';
import { take, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';

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
        private errorHandler: ErrorHandlerService,
        private spinner: NgxSpinnerService
    ) 
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
    
    removePost(id: number)
    {
        this.spinner.show();
        this.userService.removePost(id)
        .subscribe(response => {
            const posts = [...this.posts.value];
            posts.splice(posts.findIndex(function(i){
                return i.id === id;
            }), 1);
            this.posts.next(posts);
            this.spinner.hide();
        }, error => {
            this.errorHandler.showErrors(error);
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
        setTimeout(() => {
            this.spinner.show();            
        }, 500);
        
        this.userService.getPosts(url)
        .pipe(
            take(1)
        )
        .subscribe((response: PostModels.PostSuccessResponse)=> {            
            this.postResponse = response;
            const allPosts = [...this.posts.value, ...this.postResponse.data];
            this.posts.next(allPosts);
            this.spinner.hide();
        },error => {            
            this.errorHandler.showErrors(error);
        });
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetAllPosts, CreatePost, ResetPosts } from 'src/shared/store/actions/post.actions';
import { AppState } from 'src/shared/store/states/app.state';
import { Post, CreatePostRequest, PostErrorResponse  } from  'src/shared/models/timeline/post.models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/shared/services/auth.service';
import { selectAllPosts, selectPostEntities, getNextPageUrl } from 'src/shared/store/selectors/post.selectors';
import { Observable, Subscription } from 'rxjs';
import { apiPaths } from 'src/shared/parameters/backend-endpoints';
import { take } from 'rxjs/operators';

@Component({
    selector: 'timeline-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{
  //private postError: PostModels.PostErrorResponse;    
  
    posts: Observable<Post[]>;
    
    isAuthenticated = false;
    private postError: PostErrorResponse;
    

    constructor(
        private store: Store<AppState>, 
        private authService: AuthService, 
        private toastr: ToastrService
    ) { }

    ngOnInit() { 
        this.errorHandling();

        this.isAuthenticated = this.authService.isAuthenticated();
        this.store.dispatch(new GetAllPosts(apiPaths.timeline.post.getAllPosts));
        this.posts = this.store.pipe(select(selectAllPosts));
    }

    ngOnDestroy() {
        console.log('onDestroy'); 
        this.store.dispatch(new ResetPosts());       
    }

    errorHandling() {
        this.store.select('posts').subscribe((postState=> {            
            /* error handling */
            if(postState.error!==null) {
                this.postError = postState.error; 
                if(this.postError.errors!==null) {
                    this.postError.errors.forEach(element => {
                        this.toastr.error(this.postError.message, element);
                    });
                } else {
                    this.toastr.error('Sorry!', this.postError.message);
                }
            }
        }));
    }

    createPost(data: CreatePostRequest) {
        this.store.dispatch(new CreatePost(data));
    }

    onScroll() {
        let nextPageUrl: Observable<string>;
        this.store.pipe(select(getNextPageUrl))
        .pipe(take(1))
        .subscribe((url) => {
            if(url!=null) {                
                this.store.dispatch(new GetAllPosts(url));      
            }
        });
    }
}
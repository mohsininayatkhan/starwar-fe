import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetAllPosts, CreatePost } from 'src/shared/store/actions/post.actions';
import { AppState } from 'src/shared/store/states/app.state';
import { Post, CreatePostRequest, PostErrorResponse  } from  'src/shared/models/timeline/post.models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/shared/services/auth.service';
import { selectAllPosts, selectPostEntities } from 'src/shared/store/selectors/post.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'timeline-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

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
        this.store.dispatch(new GetAllPosts());
        this.posts = this.store.pipe(select(selectAllPosts));
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
}
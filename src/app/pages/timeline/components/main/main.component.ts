import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetAllPosts, GetAllPostsError, GetAllPostsSuccess } from 'src/shared/store/actions/post.actions';
import { AppState } from 'src/shared/store/states/app.state';
import { Post } from  'src/shared/models/timeline/post.models';
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

    constructor(
        private store: Store<AppState>, 
        private authService: AuthService, 
        private toastr: ToastrService
    ) { }

    ngOnInit() {     
        this.isAuthenticated = this.authService.isAuthenticated();
        this.store.dispatch(new GetAllPosts());
        this.posts = this.store.pipe(select(selectAllPosts));        
    }
}
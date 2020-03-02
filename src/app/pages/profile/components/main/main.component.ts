import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/shared/store/states/app.state';
import { UploadUserProfilePhoto } from 'src/shared/store/actions/auth.actions';
import { apiPaths } from 'src/shared/parameters/backend-endpoints';
import * as AuthModels from  'src/shared/models/auth/auth.models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/shared/services/auth.service';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { User } from 'src/shared/models/auth/user.model';
import { UserService } from 'src/shared/services/user.service';
import { Post, PostErrorResponse } from  'src/shared/models/timeline/post.models';
import * as PostModels from  'src/shared/models/timeline/post.models';
import { takeUntil, } from 'rxjs/operators';
import { Subject} from 'rxjs';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy
{   
    authUser: User = null;
    private postError: PostErrorResponse;
    private postResponse: PostModels.PostSuccessResponse;
    
    private unSubscribe = new Subject<void>();

    @ViewChild('postTabLink', {static: true}) postTabLink: ElementRef;
    

    constructor(private store: Store<AppState>, 
        private authService: AuthService, 
        private toastr: ToastrService, 
        private userService: UserService,
        private errorHandler: ErrorHandlerService) 
    {}

    ngOnInit() 
    {
        this.authService.getStoreUser().subscribe(user => {
            this.authUser = user;            
        });

        this.getUserPosts();        
    }

    /*ngAfterViewInit() {        
        this.postTabLink.nativeElement.dispatchEvent(new MouseEvent('click'));
    }*/

    ngOnDestroy()
    {
        this.unSubscribe.next();
        this.unSubscribe.complete();
    }

    uploadPhoto(file: File)
    {    
        const request : AuthModels.UploadPhotoRequest = {
            photo: file
        };       
        this.store.dispatch(new UploadUserProfilePhoto(request));
    }
    
    getUserPosts()
    {
        this.userService.getPosts(apiPaths.user.post.getAllPosts.replace('{id}', '1'))              
        .pipe(
            takeUntil(this.unSubscribe)
        )
        .subscribe((response: PostModels.PostSuccessResponse)=> {            
            this.postResponse = response;
            console.log(this.postResponse);
        },error => {            
            const errorResponse: PostModels.PostErrorResponse = this.errorHandler.getPostErrors(error);
            this.errorHandling(errorResponse);
        });
    }

    errorHandling(errorResponse) 
    {  
        if(errorResponse!==null) {
            this.toastr.error('Sorry!', errorResponse.message);
        } else {
            this.postError.errors.forEach(element => {                        
                this.toastr.error(errorResponse.message, element);
            });
        }
    }
}
import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/shared/store/states/app.state';
import { UploadUserProfilePhoto } from 'src/shared/store/actions/auth.actions';
import * as AuthModels from  'src/shared/models/auth/auth.models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/shared/services/auth.service';
import { UserService } from 'src/shared/services/user.service';
import { User } from 'src/shared/models/auth/user.model';
import * as ProfileModels  from 'src/shared/models/profile/profile.models';
import * as PostModels from  'src/shared/models/timeline/post.models';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit
{   
    authUser: User = null;
    private userId: number;
    //public user: BehaviorSubject<ProfileModels.Profile>;    
    private user: ProfileModels.Profile;    

    //@ViewChild('postTabLink', {static: true}) postTabLink: ElementRef;    

    constructor(
        private store: Store<AppState>, 
        private authService: AuthService, 
        private userService: UserService, 
        private toastr: ToastrService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() 
    {        
        this.route.params.subscribe((params: Params) => {
            this.userId = +params['id'];
            this.userService.getProfile(this.userId)
            .subscribe(user => {
                const profile = <ProfileModels.Profile>user; 
                this.userService.setUser(profile);
                this.user = profile;
            });
        });
        
        this.authService.getStoreUser().subscribe(user => {
            this.authUser = user;            
        });         
    }

    /*ngAfterViewInit() {        
        this.postTabLink.nativeElement.dispatchEvent(new MouseEvent('click'));
    }*/    

    uploadPhoto(file: File)
    {    
        const request : AuthModels.UploadPhotoRequest = {
            photo: file
        };       
        this.store.dispatch(new UploadUserProfilePhoto(request));
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
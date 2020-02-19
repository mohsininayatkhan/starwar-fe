import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/shared/store/states/app.state';
import { UploadUserProfilePhoto } from 'src/shared/store/actions/auth.actions';
import * as AuthModels from  'src/shared/models/auth/auth.models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/shared/services/auth.service';
import { User } from 'src/shared/models/auth/user.model';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit 
{   
    authUser: User = null;

    constructor(private store: Store<AppState>, private authService: AuthService, private toastr: ToastrService) {}

    ngOnInit() 
    {
        this.authService.getStoreUser().subscribe(user => {
            this.authUser = user;            
        });
    }

    uploadPhoto(file: File)
    {    
        const request : AuthModels.UploadPhotoRequest = {
            photo: file
        };       
        this.store.dispatch(new UploadUserProfilePhoto(request));
    }    
}
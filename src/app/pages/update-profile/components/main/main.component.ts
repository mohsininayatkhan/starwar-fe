import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/shared/services/auth.service';
import { UpdateUserProfile } from 'src/shared/store/actions/auth.actions';
import { AppState } from 'src/shared/store/states/app.state';
import * as AuthModels from  'src/shared/models/auth/auth.models';
import * as ProfileModels from  'src/shared/models/profile/profile.models';
import { ToastrService } from 'ngx-toastr';
import { UploadUserProfilePhoto } from 'src/shared/store/actions/auth.actions';
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { server } from 'src/shared/parameters/backend-endpoints';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit 
{    
    // another way to get form object by tag
    //@ViewChild('form', {static: true}) loginForm: NgForm;
    private basePath : string;

    private authError: AuthModels.AuthErrorResponse;
    private user = null;  
    private genderList : ProfileModels.Gender[] = null;   

    constructor(
        private store: Store<AppState>, 
        private toastr: ToastrService, 
        private authService: AuthService, 
        private spinner: NgxSpinnerService,
        private errorHandler: ErrorHandlerService,
    ) 
    { 
        this.basePath = server;
    }

    ngOnInit() 
    {
        this.store.select('auth').subscribe((authState=> {              
            if (authState.error!==null) {
                this.errorHandler.showErrors(authState.error);
            }
            
            if (authState.processing) {
                this.spinner.show();
            } else {
                this.spinner.hide();
            }
        }));

        this.genderList = [
            {id: 'Male', name : 'Male'}, 
            {id: 'Female', name : 'Female'}
        ];         
        
        this.authService.getStoreUser().subscribe(user => {
            this.user = user;         
            }, error => {            
        });        
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }        

        const data = form.value;
        this.store.dispatch(new UpdateUserProfile(data));
    } 
    
    onChangePhoto(files: FileList)
    { 
        const file: File = files.item(0);
        const request : AuthModels.UploadPhotoRequest = {
            photo: file
        };       
        this.store.dispatch(new UploadUserProfilePhoto(request));
    }    
}
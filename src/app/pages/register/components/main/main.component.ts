import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Register, AuthError, AuthSuccess } from 'src/shared/store/actions/auth.actions';
import { AppState } from 'src/shared/store/states/app.state';
import * as AuthModels from  'src/shared/models/auth/auth.models';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit 
{    
    // another way to get form object by tag
    //@ViewChild('form', {static: true}) loginForm: NgForm;

    private authError: AuthModels.AuthErrorResponse;    

    constructor(
        private store: Store<AppState>, 
        private errorHandler: ErrorHandlerService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {        
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
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        } 
        const data = form.value;
        const request : AuthModels.RegiserRequest = {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.confirmPassword
        };        
        this.store.dispatch(new Register(request));
    }
}
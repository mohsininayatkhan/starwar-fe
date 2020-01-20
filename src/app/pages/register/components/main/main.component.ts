import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { Store } from '@ngrx/store';
import { Register, RegisterError, RegisterSuccess } from 'src/shared/store/actions/auth.actions';
import { AppState } from 'src/shared/store/states/app.state';
import { User } from 'src/shared/models/auth/user.model';
import * as RegisterModels from  'src/shared/models/auth/register.models';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    
    // another way to get form object by tag
    //@ViewChild('form', {static: true}) loginForm: NgForm;

    private authError: RegisterModels.RegisterErrorResponse;

    constructor(private _store: Store<AppState>, private toastr: ToastrService) { }

    ngOnInit() {
        
        this._store.select('auth').subscribe((authState=> {            
            if(authState.error!==null) {
                this.authError = authState.error;  
                this.authError.errors.forEach(element => {
                    this.toastr.error(this.authError.message, element);
                });

                if(authState.user!==null) {
                    console.log(authState.user);
                }
            }
        }));
    }

    onSubmit(form: NgForm) {

        if(!form.valid) {
            return;
        }        

        const data = form.value;
        
        const request : RegisterModels.RegiserRequest = {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.confirmPassword
        };        
        this._store.dispatch(new Register(request));
    }    
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from 'src/shared/store/actions/auth.actions';
import { AppState } from 'src/shared/store/states/app.state';
import * as AuthModels from  'src/shared/models/auth/auth.models';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit 
{    

    private authError: AuthModels.AuthErrorResponse;    
    
    constructor(private store: Store<AppState>, private toastr: ToastrService) { }

    ngOnInit() {        
        this.store.select('auth').subscribe((authState=> {            
            /* error handling */
            if (authState.error!==null) {
                this.authError = authState.error; 
                if (this.authError.errors!==null) {
                    this.authError.errors.forEach(element => {
                        this.toastr.error(this.authError.message, element);
                    });
                } else {
                    this.toastr.error('Sorry!', this.authError.message);
                }
            }
        }));
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }        

        const data = form.value;
        const request : AuthModels.LoginRequest = {
            email: data.email,
            password: data.password
        };        
        this.store.dispatch(new Login(request));
    }
}
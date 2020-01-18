import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { Store } from '@ngrx/store';
import { Regiser, RegisterError, RegisterSuccess } from 'src/shared/store/actions/auth.actions';
import { AppState } from 'src/shared/store/states/app.state';
import { UserRegisteration } from 'src/shared/models/user-registeration.model';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    
    // another way to get form object by tag
    //@ViewChild('form', {static: true}) loginForm: NgForm;

    /*constructor(private _authService: AuthService) { }*/
    constructor(private _store: Store<AppState>) { }
    ngOnInit() {        
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }        

        const data = form.value;
        const user : UserRegisteration = {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.confirmPassword
        };
        
        this._store.dispatch(new Regiser(user));

        /*
        this._authService.register(data.name, data.email, data.password, data.confirmPassword)
        .subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error.message);
            }
        );*/

    }    
}
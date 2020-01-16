import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    
    // another way to get form object by tag
    //@ViewChild('form', {static: true}) loginForm: NgForm;

    constructor(private _authService: AuthService) { }
    ngOnInit() {        
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }

        const data = form.value;
        this._authService.register(data.name, data.email, data.password, data.confirmPassword)
        .subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error.message);
            }
        );   
    }    
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'login-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
    // another way to get form object by tag
    //@ViewChild('form', {static: true}) loginForm: NgForm;

    ngOnInit() {        
    }

    onSubmit(form: NgForm) {
        console.log(form);
    }
}
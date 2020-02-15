import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CreatePostRequest, Post } from 'src/shared/models/timeline/post.models';

@Component({
    selector: 'timeline-mypost',
    templateUrl: './mypost.component.html',
    styleUrls: ['./mypost.component.css']
})
export class MyPostComponent implements OnInit {   

    @Output() createPostRequest = new EventEmitter<CreatePostRequest>();ef;
    constructor() {}

    ngOnInit() {}

    onSubmit(form: NgForm) {       
        if(!form.valid) {
            return;
        }        
        
        var post: CreatePostRequest  = {
            title: form.value.mypost
        }
        
        this.createPostRequest.emit(post);
        form.reset();
    }
}
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CreatePostRequest, UploadPhotosRequest } from 'src/shared/models/timeline/post.models';

@Component({
    selector: 'timeline-mypost',
    templateUrl: './mypost.component.html',
    styleUrls: ['./mypost.component.css']
})
export class MyPostComponent implements OnInit {   

    @Output() createPostRequest = new EventEmitter<CreatePostRequest>();
    @Output() uploadPhotosRequest = new EventEmitter<File[]>();

    constructor() {}

    ngOnInit() {}

    onUploadPictures(files: FileList) 
    {
        const uploadedFiles = Array.from(files);      
        this.uploadPhotosRequest.emit(uploadedFiles);
    }

    onSubmit(form: NgForm) 
    {       
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
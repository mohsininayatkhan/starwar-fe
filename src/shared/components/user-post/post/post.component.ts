import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/shared/models/timeline/post.models';
import { User } from 'src/shared/models/auth/user.model';
import { server } from 'src/shared/parameters/backend-endpoints';

@Component({
    selector: 'timeline-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit 
{
    private basePath : string;

    @Input() post: Post;
    @Input() user: User;

    @Output() removePostId = new EventEmitter<number>();

    constructor() 
    {
        this.basePath = server;
    }

    ngOnInit() {}

    onPostRemove(id: number)
    {        
        this.removePostId.emit(id);
    }
}
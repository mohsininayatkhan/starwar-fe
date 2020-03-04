import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/shared/models/timeline/post.models';
import { User } from 'src/shared/models/auth/user.model';

@Component({
    selector: 'timeline-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit 
{
    @Input() post: Post;
    @Input() user: User;

    @Output() removePostId = new EventEmitter<number>();

    constructor() {}

    ngOnInit() {}

    onPostRemove(id: number)
    {        
        this.removePostId.emit(id);
    }
}
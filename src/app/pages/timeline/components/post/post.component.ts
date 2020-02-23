import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/shared/models/timeline/post.models';

@Component({
    selector: 'timeline-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    @Input() post: Post;

    constructor() {}

    ngOnInit() {}
}
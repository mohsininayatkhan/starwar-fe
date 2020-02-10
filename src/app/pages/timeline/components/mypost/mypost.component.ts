import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/shared/models/timeline/post.models';

@Component({
    selector: 'timeline-mypost',
    templateUrl: './mypost.component.html',
    styleUrls: ['./mypost.component.css']
})
export class MyPostComponent implements OnInit {

    @Input() post: Post;

    constructor() {
    }

    ngOnInit() {
        console.log(this.post);
    }
}
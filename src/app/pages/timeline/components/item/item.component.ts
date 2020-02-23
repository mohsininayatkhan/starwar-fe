import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/shared/models/timeline/post.models';

@Component({
    selector: 'timeline-post-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

    @Input() items: Item[];

    constructor() {}

    ngOnInit() {}
}
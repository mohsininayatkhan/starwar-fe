import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/shared/models/timeline/post.models';
import { server } from 'src/shared/parameters/backend-endpoints';

@Component({
    selector: 'timeline-post-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit 
{
    private basePath : string;

    @Input() items: Item[];

    constructor()
    {
        this.basePath = server;
    }

    ngOnInit() {}
}
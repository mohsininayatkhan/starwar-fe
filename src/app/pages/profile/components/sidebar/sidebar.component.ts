import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as ProfileModels  from 'src/shared/models/profile/profile.models';

@Component({
    selector: 'profile-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit 
{
    @Input() user: ProfileModels.Profile;
    
    constructor() {}

    ngOnInit() {}
}
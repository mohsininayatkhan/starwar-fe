import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as ProfileModels  from 'src/shared/models/profile/profile.models';

@Component({
    selector: 'profile-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit 
{
    @Output() uploadUserPhoto = new EventEmitter<File>(); 
    @Input() user: ProfileModels.Profile;

    constructor() {}

    ngOnInit() {}  
    
    onChangePhoto(files: FileList)
    {      
        this.uploadUserPhoto.emit(files.item(0));
    }

    getProfilePhotoUrl()
    {
        return "url('"+this.user.profile_picture+"')";
    }
}
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as ProfileModels  from 'src/shared/models/profile/profile.models';
import { User } from 'src/shared/models/auth/user.model';
import { server } from 'src/shared/parameters/backend-endpoints';

@Component({
    selector: 'profile-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit 
{   
    private basePath : string;

    @Output() uploadUserPhoto = new EventEmitter<File>(); 
    @Input() user: ProfileModels.Profile;
    @Input() authUser: User;

    constructor() 
    {
        this.basePath = server;
    }

    ngOnInit() {}
    
    onChangePhoto(files: FileList)
    {      
        this.uploadUserPhoto.emit(files.item(0));
    }
}
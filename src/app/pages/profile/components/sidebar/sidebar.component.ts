import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from 'src/shared/models/auth/user.model';

@Component({
    selector: 'profile-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit 
{
    @Output() uploadUserPhoto = new EventEmitter<File>(); 
    @Input() user: User;

    constructor() {}

    ngOnInit() 
    {
        console.log(this.user);
    }  
    
    onChangePhoto(files: FileList)
    {      
        this.uploadUserPhoto.emit(files.item(0));
    }

    getProfilePhotoUrl()
    {
        return "url('"+this.user.profile_picture+"')";
    }
}
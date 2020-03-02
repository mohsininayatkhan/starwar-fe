import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from 'src/shared/models/auth/user.model';

@Component({
    selector: 'profile-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit 
{   
    @Output() uploadUserPhoto = new EventEmitter<File>(); 
    @Input() user: User;

    constructor() {}

    ngOnInit() {
        console.log(this.user);
    }
    
    onChangePhoto(files: FileList)
    {      
        this.uploadUserPhoto.emit(files.item(0));
    }
}
import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserPostModule } from 'src/shared/components/user-post/user-post.module';

import { MainComponent } from './components/main/main.component';
import { MyPostComponent } from './components/mypost/mypost.component';


const routes = [
    {
        path: 'timeline',
        component: MainComponent
    }
];

@NgModule({
    declarations:[        
        MainComponent,        
        MyPostComponent,      
    ],
    imports: [
        FormsModule,
        BrowserModule,
        InfiniteScrollModule,        
        NgbModule,
        RouterModule.forChild(routes), 
        UserPostModule        
    ],
    exports: [
    ]
})
export class TimelineModule 
{
}
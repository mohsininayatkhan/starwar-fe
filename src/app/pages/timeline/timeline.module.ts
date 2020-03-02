import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/post/post.component';
import { MyPostComponent } from './components/mypost/mypost.component';
import { ItemComponent } from './components/item/item.component';

const routes = [
    {
        path: 'timeline',
        component: MainComponent
    }
];

@NgModule({
    declarations:[        
        MainComponent,
        PostComponent,
        MyPostComponent,
        ItemComponent,        
    ],
    imports: [
        FormsModule,
        BrowserModule,
        InfiniteScrollModule,        
        NgbModule,
        RouterModule.forChild(routes),        
        
    ],
    exports: [
    ]
})
export class TimelineModule 
{
}
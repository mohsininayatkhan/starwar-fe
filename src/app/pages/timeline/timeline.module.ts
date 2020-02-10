import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/post/post.component';
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
        PostComponent,
        MyPostComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forChild(routes),
    ],
    exports: [
    ]
})
export class TimelineModule {
}
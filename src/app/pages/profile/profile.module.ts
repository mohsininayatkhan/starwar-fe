import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserPostModule } from 'src/shared/components/user-post/user-post.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { PostsComponent } from './components/posts/posts.component';
import { HeaderComponent } from './components/header/header';

const routes = [
    {
        path: 'profile/:id',
        component: MainComponent,
        children: [
            { 
                'path': 'posts', 
                component: PostsComponent
            }
        ]
    }
];

@NgModule({
    declarations:[        
        MainComponent,
        SidebarComponent,
        ContentComponent,
        PostsComponent,
        HeaderComponent        
    ],
    imports: [
        FormsModule,
        BrowserModule, 
        UserPostModule,        
        RouterModule.forChild(routes),
        InfiniteScrollModule,
    ],
    exports: [
    ],    
})
export class ProfileModule 
{
}
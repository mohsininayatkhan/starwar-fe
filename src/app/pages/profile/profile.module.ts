import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { AuthGuardService } from 'src/shared/services/auth-guard.service';
import { PostsComponent } from './components/posts/posts.component';
import { HeaderComponent } from './components/header/header';

const routes = [
    {
        path: 'profile',
        component: MainComponent,
        canActivate: [AuthGuardService],
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
        HeaderComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forChild(routes),
    ],
    exports: [
    ],
    providers: [AuthGuardService],
})
export class ProfileModule 
{
}
import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { AuthGuardService } from 'src/shared/services/auth-guard.service';
import { PostComponent } from './components/post/post.component';
import { HeaderComponent } from './components/header/header';

const routes = [
    {
        path: 'profile',
        component: MainComponent,
        canActivate: [AuthGuardService],
        children: [
            { 
                'path': 'post', 
                component: PostComponent
            }
        ]
    }
];

@NgModule({
    declarations:[        
        MainComponent,
        SidebarComponent,
        ContentComponent,
        PostComponent,
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
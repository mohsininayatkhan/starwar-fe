import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { AuthGuardService } from 'src/shared/services/auth-guard.service';

const routes = [
    {
        path: 'profile',
        component: MainComponent,
        canActivate: [AuthGuardService]
    }
];
@NgModule({
    declarations:[        
        MainComponent,
        SidebarComponent,
        ContentComponent
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
export class ProfileModule {
}
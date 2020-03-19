import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from 'src/shared/services/auth-guard.service';

import { MainComponent } from './components/main/main.component';

const routes = [
    {
        path: 'update-profile',
        canActivate: [AuthGuardService],
        component: MainComponent
    }
];

@NgModule({
    declarations:[        
        MainComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forChild(routes),
    ],
    exports: [
    ],
    providers: [AuthGuardService]
})
export class UpdateProfileModule 
{
}
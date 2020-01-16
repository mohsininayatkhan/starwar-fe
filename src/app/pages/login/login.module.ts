import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './components/main/main.component';

const routes = [
    {
        path: 'login',
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
    ]
})
export class LoginModule {
}
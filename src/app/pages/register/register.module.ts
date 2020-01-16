import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './components/main/main.component';

import { MustMatchValidatorDirective } from '../../../shared/directives/must-match-validator/must-match-validator.directive';

const routes = [
    {
        path: 'register',
        component: MainComponent
    }
];
@NgModule({
    declarations:[        
        MainComponent,
        MustMatchValidatorDirective
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forChild(routes),
    ],
    exports: [
    ]
})
export class RegisterModule {
}
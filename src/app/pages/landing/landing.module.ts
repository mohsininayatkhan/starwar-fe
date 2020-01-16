import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { DoOrDontComponent } from './components/do-or-dont/do-or-dont.component';
import { ReportComponent } from './components/report/report.component';

const routes = [
    {
        path: 'landing',
        component: MainComponent
    }
];

@NgModule({
    declarations: [
        MainComponent,
        DoOrDontComponent,
        ReportComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(routes)
    ],
    exports: []
})
export class LandingModule {

}
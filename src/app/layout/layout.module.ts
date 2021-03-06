import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { MainComponent } from './components/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        ContentComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        NgbModule
    ],
    exports: [
        MainComponent
    ]
})
export class LayoutModule
{
}
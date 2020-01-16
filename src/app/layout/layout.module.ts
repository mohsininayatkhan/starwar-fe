import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        ContentComponent
    ],
    imports: [
        RouterModule
    ],
    exports: [
        MainComponent
    ]
})
export class LayoutModule
{
}
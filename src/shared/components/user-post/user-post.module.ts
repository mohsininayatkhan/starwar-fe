import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {TimeAgoPipe} from 'time-ago-pipe';

import { PostComponent } from 'src/shared/components/user-post/post/post.component';
import { ItemComponent } from 'src/shared/components/user-post/item/item.component';

@NgModule({
    declarations: [ 
        PostComponent, 
        ItemComponent, 
        TimeAgoPipe
    ],
    imports: [ BrowserModule, RouterModule ],
    entryComponents: [ PostComponent],
    exports: [ PostComponent, ItemComponent]
})
export class UserPostModule
{}

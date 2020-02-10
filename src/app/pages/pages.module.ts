import { NgModule } from '@angular/core';
import { LandingModule } from './landing/landing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { TimelineModule } from './timeline/timeline.module';

@NgModule({
    declarations: [],
    imports: [
        LandingModule,
        LoginModule,
        RegisterModule,
        TimelineModule
    ],
    exports: [        
    ]
})
export class PagesModule {    
}

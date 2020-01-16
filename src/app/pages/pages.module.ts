import { NgModule } from '@angular/core';
import { LandingModule } from './landing/landing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@NgModule({
    declarations: [],
    imports: [
        LandingModule,
        LoginModule,
        RegisterModule
    ],
    exports: [        
    ]
})
export class PagesModule {    
}

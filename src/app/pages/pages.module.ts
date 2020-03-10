import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { TimelineModule } from './timeline/timeline.module';
import { ProfileModule } from './profile/profile.module';
import { UpdateProfileModule } from './update-profile/update-profile.module';

@NgModule({
    declarations: [
    ],
    imports: [        
        LoginModule,
        RegisterModule,
        TimelineModule,
        ProfileModule,
        UpdateProfileModule
    ],
    exports: [        
    ]
})
export class PagesModule 
{    
}

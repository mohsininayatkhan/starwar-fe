// Modules to be imported
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module'
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

// Components to be imported
import { AppComponent } from './app.component';

// Service to be imported
import { AuthService } from '../shared/services/auth.service';
import { PostService } from '../shared/services/post.service';
import { UserService } from '../shared/services/user.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

// Import Store effects and reducer
import { AuthEffects } from '../shared/store/effects/auth.effects';
import { PostEffects } from '../shared/store/effects/post.effects';
import * as fromApp from '../shared/store/reducers/app.reducer';

import { environment } from 'src/environments/environment';

// Application main routes
const appRoutes: Routes = [
  {
    path: '', 
    redirectTo: '/timeline',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    PagesModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
    EffectsModule.forRoot([AuthEffects, PostEffects]),
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [AuthService, PostService, UserService, ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
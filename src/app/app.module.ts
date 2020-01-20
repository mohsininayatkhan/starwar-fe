import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module'
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { FilmService } from '../shared/services/films.service';
import { AuthService } from '../shared/services/auth.service'

import { AuthEffects } from '../shared/store/effects/auth.effects';
import * as fromApp from '../shared/store/reducers/app.reducer';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr'

const appRoutes: Routes = [
  {
    path: '', 
    redirectTo: '/landing',
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
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    StoreModule.forRoot(fromApp.appReducer),
    RouterModule.forRoot(appRoutes),
    EffectsModule.forRoot([AuthEffects]),
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [FilmService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

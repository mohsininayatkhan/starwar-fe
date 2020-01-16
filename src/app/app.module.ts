import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module'

import { AppComponent } from './app.component';

import { FilmService } from '../shared/services/films.service';
import { AuthService } from '../shared/services/auth.service'

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
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    PagesModule,
    RouterModule.forRoot(appRoutes),
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [FilmService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

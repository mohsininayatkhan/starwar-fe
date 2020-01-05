import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DoOrDontComponent } from './do-or-dont/do-or-dont.component';
import { ReportComponent } from './report/report.component';
import {FilmService} from '../shared/services/films.service'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DoOrDontComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }

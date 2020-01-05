import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from 'src/shared/services/films.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Star Wars';
  public displayReport: boolean;
  private errorSub: Subscription;
  private error: string;

  constructor(private _filmService: FilmService){}

  ngOnInit(){
    this.displayReport = false;

    this.errorSub = this._filmService.error.subscribe(errorMessage => {
      this.error = errorMessage;
      console.log(this.error);
    });
  }

  getReport(event){
    this.displayReport = true;
    this._filmService.getLongestCrawlReport();
    //if(!this.displayReport) {
      //this._filmService.getReport();
      //this.displayReport = true;
      //console.log(event);
    //}
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
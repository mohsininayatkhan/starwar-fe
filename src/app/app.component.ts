import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Star Wars';
  public displayReport: boolean; 

  constructor(){}

  ngOnInit(){
    this.displayReport = false;    
  }

  getReport(event){
    this.displayReport = true;    
  }  
}
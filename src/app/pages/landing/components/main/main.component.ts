import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'landing-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    public displayReport: boolean; 

    ngOnInit() {
        this.displayReport = false;
    }

    getReport(event){
        this.displayReport = true;    
    }
}
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FilmService } from 'src/shared/services/films.service';
import { LongestCrawl } from 'src/shared/models/longest-crawl.model';
import { PopularCharacter } from 'src/shared/models/popular-character.model';
import { SpeciesAppearance } from 'src/shared/models/species-appearance.model';
import { PilotPlanet } from 'src/shared/models/pilot-planet.model';
import { Pilot } from 'src/shared/models/pilot.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  longestCrawlingData: LongestCrawl = new LongestCrawl();
  popularCharacterData: PopularCharacter[] = [];
  speciesAppearanceData: SpeciesAppearance[] = [];
  pilotsByPlanetsData: PilotPlanet[] = [];
  pilots: Pilot[] = [];

  error = null;  

  constructor(private _filmService: FilmService) { }

  ngOnInit() {
    this.getLongestCrawlReport();
    this.getPopularCharacterReport();
    this.getSpeciesByAppearanceReport();
    this.getPilotsByPlanetsReport();
  }
  

  getLongestCrawlReport() {
    this._filmService.getLongestCrawlReport().subscribe(
      data => {                
        this.longestCrawlingData = data;        
      }, 
      error => {        
        this.error = error.message;
      }
    );   
  }

  getPopularCharacterReport() {
    this._filmService.getPopularCharacterReport().subscribe(
      data => {        
        this.popularCharacterData = data;        
      }, 
      error => {
        this.error = error.message;
      }
    );   
  }

  getSpeciesByAppearanceReport() {
    this._filmService.getSpeciesByAppearanceReport().subscribe(
      data => {        
        this.speciesAppearanceData = data;
      }, 
      error => {
        this.error = error.message;
      }
    );   
  }

  getPilotsByPlanetsReport() {
    this._filmService.getPilotsByPlanetsReport().subscribe(
      data => {        
        this.pilotsByPlanetsData = data;        
      }, 
      error => {
        this.error = error.message;
      }
    );   
  }

}

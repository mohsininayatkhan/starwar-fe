import { Injectable } from '@angular/core';
import { apiPaths } from '../parameters/backend-endpoints';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';
import { LongestCrawl } from 'src/shared/models/longest-crawl.model';
import { PopularCharacter } from 'src/shared/models/popular-character.model';
import { SpeciesAppearance } from 'src/shared/models/species-appearance.model';
import { PilotPlanet } from 'src/shared/models/pilot-planet.model';
import { Pilot } from 'src/shared/models/pilot.model';

@Injectable()
export class FilmService
{ 
    error = new Subject<string>();
    constructor(private http: HttpClient){}

    getLongestCrawlReport()
    {
      return this.http
        .get(apiPaths.film.longestCrawl).pipe(
          map(responseData => {
            const report: LongestCrawl = {title:'', opening_crawl: '', length: 0};            
            report.opening_crawl = responseData['opening_crawl'];
            report.title = responseData['title'];
            report.length = responseData['length']; 
            return report;
          }),
          catchError(errorRes => {
            console.log(errorRes.message);
            return throwError(errorRes);
          })
        );
    }

    getPopularCharacterReport()
    {
      return this.http
        .get(apiPaths.film.topCharacter).pipe(
          map(responseData => {
            const report: LongestCrawl[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                report.push({ ...responseData[key], id: key });
              }
            }            
            return report;
          }),
          catchError(errorRes => {
            console.log(errorRes.message);
            return throwError(errorRes);
          })
        );
    }

    getSpeciesByAppearanceReport()
    {
      return this.http
        .get(apiPaths.film.SpeciesByAppearance).pipe(
          map(responseData => {
            const report: SpeciesAppearance[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                report.push({ ...responseData[key], id: key });
              }
            }            ;             
            return report;
          }),
          catchError(errorRes => {            
            return throwError(errorRes);
          })
        );
    }

    getPilotsByPlanetsReport()
    {
      return this.http
        .get(apiPaths.film.PilotsByPlanets).pipe(
          map(responseData => {
            const report: PilotPlanet[] = [];            

            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                const pilots: Pilot[] = [];
                let res = responseData[key]['pilots_detail'];
                if(res.length>0)
                {
                  res.forEach(element => {                    
                    pilots.push(element);
                  });        
                }                
                report.push({ ...responseData[key], id: key, vehicle_pilots: pilots });
              }
            }            
            return report;
          }),
          catchError(errorRes => {
            console.log(errorRes.message);
            return throwError(errorRes);
          })
        );
    }
}
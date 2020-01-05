import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DoOrDontComponent } from './do-or-dont/do-or-dont.component';
import { ReportComponent } from './report/report.component';
import { HttpClientModule} from '@angular/common/http';
import { FilmService } from 'src/shared/services/films.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let component : AppComponent;
  let fixture : ComponentFixture<AppComponent>;
  let element : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        DoOrDontComponent,
        ReportComponent
      ],
      providers: [
        FilmService
      ], imports :[
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Star Wars'`, () => {    
    expect(component.title).toEqual('Star Wars');
  });

  it('should render title', () => {
    fixture.detectChanges();
    expect(element.querySelector('.container'));
  });

  it('click on do or dont button should set displayReport to true', () => {    
    component.displayReport = false;
    const doOrDontEl = element.querySelector('button');
    doOrDontEl.click();
    expect(component.displayReport).toEqual(true);
  });

  /*it('click on do or dont button should display report', async(() => {  
      component.displayReport = false;
      const doOrDontEl = element.querySelector('button');
      doOrDontEl.click();
      fixture.detectChanges();
      expect(element.querySelector('app-report').innerHTML).toBeTruthy();     
  }));*/
});

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DoOrDontComponent } from './do-or-dont.component';


describe('DoOrDontComponent', () => {

  let component : DoOrDontComponent;
  let fixture : ComponentFixture<DoOrDontComponent>;
  let element : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [        
        DoOrDontComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DoOrDontComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  }));

  it(`should have correct button text`, () => { 
    const text: string = "Test";
    component.buttonText = text;
    fixture.detectChanges();    
    const buttonInnerHtml : string = element.querySelector('button').innerHTML;
    expect(buttonInnerHtml.includes(text));
  });  

  it(`should emit true on button click`, () => {    
    const doOrDontEl = element.querySelector('button');
    let isClicked :boolean = false;
    
    component.isClicked.subscribe((clicked: boolean) => {
      isClicked = clicked;
    });

    doOrDontEl.click();
    expect(isClicked);  
  });
});

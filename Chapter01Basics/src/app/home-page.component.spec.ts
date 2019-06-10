import {async, TestBed} from '@angular/core/testing';
import {HomePageComponent} from './home-page.component';

describe('HomePageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Chapter01Basics'`, () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Chapter01Basics');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Chapter01Basics!');
  });
});

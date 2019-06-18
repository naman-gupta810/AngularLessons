import { TestBed, async } from '@angular/core/testing';
import { Chapter2RootComponent } from './chapter2-root.component';

describe('Chapter2RootComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Chapter2RootComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Chapter2RootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Chapter2DataBindingAndComponentCommunication'`, () => {
    const fixture = TestBed.createComponent(Chapter2RootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Chapter2DataBindingAndComponentCommunication');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(Chapter2RootComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Chapter2DataBindingAndComponentCommunication!');
  });
});

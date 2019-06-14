import {async, TestBed} from '@angular/core/testing';
import {RecipeBookRootComponent} from './recipe-book-root.component';

describe('RecipeBookRootComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeBookRootComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RecipeBookRootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'CourseProject'`, () => {
    const fixture = TestBed.createComponent(RecipeBookRootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('CourseProject');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(RecipeBookRootComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to CourseProject!');
  });
});

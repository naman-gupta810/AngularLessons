import { TestBed, async } from '@angular/core/testing';
import { DirectiveRootComponent } from './directive-root.component';

describe('DirectiveRootComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DirectiveRootComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DirectiveRootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Chapter3Directives'`, () => {
    const fixture = TestBed.createComponent(DirectiveRootComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Chapter3Directives');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(DirectiveRootComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Chapter3Directives!');
  });
});

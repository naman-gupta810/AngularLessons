import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeViewContainerComponent} from './recipe-view-container.component';

describe('RecipeViewContainerComponent', () => {
  let component: RecipeViewContainerComponent;
  let fixture: ComponentFixture<RecipeViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeViewContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

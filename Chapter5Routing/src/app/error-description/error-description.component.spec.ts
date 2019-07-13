import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorDescriptionComponent} from './error-description.component';

describe('ErrorDescriptionComponent', () => {
  let component: ErrorDescriptionComponent;
  let fixture: ComponentFixture<ErrorDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

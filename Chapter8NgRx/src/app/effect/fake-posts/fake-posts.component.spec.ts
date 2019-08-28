import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FakePostsComponent} from './fake-posts.component';

describe('FakePostsComponent', () => {
  let component: FakePostsComponent;
  let fixture: ComponentFixture<FakePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FakePostsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

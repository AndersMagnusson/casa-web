import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveViewPageComponent } from './live-view-page.component';

describe('LiveViewPageComponent', () => {
  let component: LiveViewPageComponent;
  let fixture: ComponentFixture<LiveViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

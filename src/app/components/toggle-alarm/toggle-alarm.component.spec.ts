import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleAlarmComponent } from './toggle-alarm.component';

describe('ToggleAlarmComponent', () => {
  let component: ToggleAlarmComponent;
  let fixture: ComponentFixture<ToggleAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlarmPageComponent } from './create-alarm-page.component';

describe('CreateAlarmPageComponent', () => {
  let component: CreateAlarmPageComponent;
  let fixture: ComponentFixture<CreateAlarmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlarmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlarmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardAlarmPageComponent } from './wizard-alarm-page.component';

describe('WizardAlarmPageComponent', () => {
  let component: WizardAlarmPageComponent;
  let fixture: ComponentFixture<WizardAlarmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardAlarmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardAlarmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlarmPageComponent } from './list-alarm-page.component';

describe('ListAlarmPageComponent', () => {
  let component: ListAlarmPageComponent;
  let fixture: ComponentFixture<ListAlarmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlarmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlarmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

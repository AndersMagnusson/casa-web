import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveViewDeviceComponent } from './live-view-device.component';

describe('LiveViewDeviceComponent', () => {
  let component: LiveViewDeviceComponent;
  let fixture: ComponentFixture<LiveViewDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveViewDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

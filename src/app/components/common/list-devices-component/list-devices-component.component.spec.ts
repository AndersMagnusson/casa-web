import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDevicesComponentComponent } from './list-devices-component.component';

describe('ListDevicesComponentComponent', () => {
  let component: ListDevicesComponentComponent;
  let fixture: ComponentFixture<ListDevicesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDevicesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDevicesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

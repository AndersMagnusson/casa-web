import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableDeviceComponentComponent } from './editable-device-component.component';

describe('EditableDeviceComponentComponent', () => {
  let component: EditableDeviceComponentComponent;
  let fixture: ComponentFixture<EditableDeviceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableDeviceComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableDeviceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

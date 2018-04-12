import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCameraPageComponent } from './add-camera-page.component';

describe('AddCameraPageComponent', () => {
  let component: AddCameraPageComponent;
  let fixture: ComponentFixture<AddCameraPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCameraPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCameraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

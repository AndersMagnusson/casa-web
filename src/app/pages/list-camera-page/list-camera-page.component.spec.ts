import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCameraPageComponent } from './list-camera-page.component';

describe('ListCameraPageComponent', () => {
  let component: ListCameraPageComponent;
  let fixture: ComponentFixture<ListCameraPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCameraPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCameraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

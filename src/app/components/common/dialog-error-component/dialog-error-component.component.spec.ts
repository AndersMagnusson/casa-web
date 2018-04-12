import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorComponentComponent } from './dialog-error-component.component';

describe('DialogErrorComponentComponent', () => {
  let component: DialogErrorComponentComponent;
  let fixture: ComponentFixture<DialogErrorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogErrorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErrorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

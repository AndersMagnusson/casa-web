import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCredentialsComponentComponent } from './dialog-credentials-component.component';

describe('DialogCredentialsComponentComponent', () => {
  let component: DialogCredentialsComponentComponent;
  let fixture: ComponentFixture<DialogCredentialsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCredentialsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCredentialsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsComponentComponent } from './credentials-component.component';

describe('CredentialsComponentComponent', () => {
  let component: CredentialsComponentComponent;
  let fixture: ComponentFixture<CredentialsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

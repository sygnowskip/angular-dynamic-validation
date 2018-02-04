import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFieldMessagesComponent } from './validation-field-messages.component';

describe('ValidationFieldMessagesComponent', () => {
  let component: ValidationFieldMessagesComponent;
  let fixture: ComponentFixture<ValidationFieldMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationFieldMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationFieldMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

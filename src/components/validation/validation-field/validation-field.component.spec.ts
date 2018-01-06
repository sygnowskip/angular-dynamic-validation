import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFieldComponent } from './validation-field.component';

describe('ValidationFieldComponent', () => {
  let component: ValidationFieldComponent;
  let fixture: ComponentFixture<ValidationFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

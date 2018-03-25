import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFieldMessagesComponent, ValidationFieldErrorsMessages, ValidationFieldErrors } from './validation-field-messages.component';
import { By } from '@angular/platform-browser';
import { ValidationRulesDefaultMessagesService } from '../../services/validation-field-messages-defaults/validation-field-messages-defaults.service';
import { ObjectKeysPipe } from '../../pipes/object-keys-pipe/object-keys.pipe';

describe('ValidationFieldMessagesComponent', () => {
  let component: ValidationFieldMessagesComponent;
  let fixture: ComponentFixture<ValidationFieldMessagesComponent>;
  let defaultMessagesService: ValidationRulesDefaultMessagesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ValidationFieldMessagesComponent,
        ObjectKeysPipe
      ],
      providers: [
        ValidationRulesDefaultMessagesService
      ]
    });


    fixture = TestBed.createComponent(ValidationFieldMessagesComponent);
    component = fixture.componentInstance;
    component.fieldValidationMessages = <ValidationFieldErrorsMessages>{};
    component.validationErrors = <ValidationFieldErrors>{};
    fixture.detectChanges();

    defaultMessagesService = TestBed.get(ValidationRulesDefaultMessagesService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all errors', () => {
    component.validationErrors = {
      required: true,
      pattern: true
    };
    fixture.detectChanges();

    var errorsCount = fixture.debugElement.queryAll(By.css('div.errors > div')).length;
    expect(errorsCount).toEqual(2);
  });

  it('should display custom error for field', () => {
    component.validationErrors = {
      required: true
    };
    component.fieldValidationMessages = <ValidationFieldErrorsMessages><any>{
      required: "Custom validation message"
    }
    fixture.detectChanges();

    var error = fixture.debugElement.nativeElement.querySelector('div.errors > div');
    expect(error).toBeDefined();
    expect(error.textContent).toContain("Custom validation message");
  });

  it('should display default error for field', () => {
    component.validationErrors = {
      required: true
    };
    fixture.detectChanges();

    var error = fixture.debugElement.nativeElement.querySelector('div.errors > div');
    expect(error).toBeDefined();
    expect(error.textContent).toContain(defaultMessagesService.get("required"));
  });
});

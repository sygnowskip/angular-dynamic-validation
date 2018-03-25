import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFieldComponent } from './validation-field.component';
import { ValidationFieldRulesExtractorService } from '../../services/validation-field-rules-extractor/validation-field-rules-extractor.service';
import { ValidationFieldDefaultMessagesService } from '../../services/validation-field-default-messages/validation-field-default-messages.service';
import { FormGroupDirective, FormBuilder } from '@angular/forms';
import { ValidationFieldMessagesComponent, ValidationFieldErrorsMessages } from '../validation-field-messages/validation-field-messages.component';
import { ObjectKeysPipe } from '../../pipes/object-keys-pipe/object-keys.pipe';
import { ValidationFieldValidatorsService } from '../../services/validation-field-validators/validation-field-validators.service';
import { ValidationFieldControlService } from '../../services/validation-field-control/validation-field-control.service';
import { ValidationFieldRefresherService } from '../../services/validation-field-refresher/validation-field-refresher.service';
import { ServerErrorService } from '../../services/server-error/server-error.service';
import { FormMessagesCleanerService } from '../../services/form-messages-cleaner/form-messages-cleaner.service';
import { ServerErrorReaderService } from '../../services/server-error-reader/server-error-reader.service';
import { ValidationRulesDefaultMessagesService } from '../../services/validation-field-messages-defaults/validation-field-messages-defaults.service';
import { FormGroupValidationRulesDirective } from '../../directives/form-group-validation-rules/form-group-validation-rules.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ValidatorsFactoryService } from '../../services/validators-factory/validators-factory.service';
import { AvailableValidatorsService } from '../../services/available-validators/available-validators.service';
import { ValidationFormControl } from '../../models/validation-form-control/validation-form-control.model';

describe('ValidationFieldComponent', () => {
  let component: ValidationFieldComponent;
  let fixture: ComponentFixture<ValidationFieldComponent>;
  let formDirective = {
    form: {
      get: () => {
        return new ValidationFormControl();
      },
      addControl: () => void {}
    }
  };
  let validationRulesDirective = {
    validationRulesChanged: {
      subscribe: () => void {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ObjectKeysPipe,
        ValidationFieldMessagesComponent,
        ValidationFieldComponent
      ],
      providers: [
        ValidationFieldValidatorsService,
        ValidationFieldControlService,
        ValidationFieldRulesExtractorService,
        ValidationFieldDefaultMessagesService,
        ValidationFieldRefresherService,
        FormMessagesCleanerService,
        ServerErrorReaderService,
        ServerErrorService,
        ValidationRulesDefaultMessagesService,
        ValidatorsFactoryService,
        AvailableValidatorsService,
        FormBuilder,
        { provide: FormGroupDirective, useValue: formDirective },
        { provide: FormGroupValidationRulesDirective, useValue: validationRulesDirective }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });


    fixture = TestBed.createComponent(ValidationFieldComponent);
    component = fixture.componentInstance;
    component.defaultErrorMessages = new ValidationFieldErrorsMessages();
    component.field = "some-field";
    component.label = "some field label";
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

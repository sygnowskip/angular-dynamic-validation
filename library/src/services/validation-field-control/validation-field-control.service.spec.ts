import { TestBed, inject } from '@angular/core/testing';

import { ValidationFieldControlService } from './validation-field-control.service';
import { FormBuilder, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { ValidationFormControl } from '../../models/validation-form-control/validation-form-control.model';

describe('ValidationFieldControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidationFieldControlService,
        FormBuilder
      ]
    });
  });

  it('should be created', inject([ValidationFieldControlService], (service: ValidationFieldControlService) => {
    expect(service).toBeTruthy();
  }));

  it('should create control if not exists', inject([ValidationFieldControlService], (service: ValidationFieldControlService) => {
    let called = false;
    var formGroup = <FormGroupDirective><any>{
      form: {
        get: () => {
          return called ? {} : undefined;
        },
        addControl: () => {
          called = true;
        }
      }
    };
    var control = service.setupControl(formGroup, "non-existing");
    expect(control).toBeDefined();
    expect(called).toBeTruthy();
  }));

  it('should return control if already exists', inject([ValidationFieldControlService], (service: ValidationFieldControlService) => {
    var formGroup = <FormGroupDirective><any>{
      form: {
        get: () => {
          return new ValidationFormControl('', Validators.required);
        }
      }
    };
    var control = service.setupControl(formGroup, "existing");
    expect(control).toBeDefined();
  }));

  it('should return control if already exists and print warning if FormControl is used instead of ValidationFormControl', inject([ValidationFieldControlService], (service: ValidationFieldControlService) => {
    var formGroup = <FormGroupDirective><any>{
      form: {
        get: () => {
          return new FormControl();
        }
      }
    };
    var control = service.setupControl(formGroup, "existing");
    expect(control).toBeDefined();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ValidationFieldValidatorsService } from './validation-field-validators.service';
import { ValidatorsFactoryService } from '../validators-factory/validators-factory.service';
import { AvailableValidatorsService } from '../available-validators/available-validators.service';
import { ValidationFormControl } from '../../models/validation-form-control/validation-form-control.model';

describe('ValidationFieldValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidationFieldValidatorsService,
        ValidatorsFactoryService,
        AvailableValidatorsService
      ]
    });
  });

  it('should be created', inject([ValidationFieldValidatorsService], (service: ValidationFieldValidatorsService) => {
    expect(service).toBeTruthy();
  }));

  it('should print warning if rules are undefined', inject([ValidationFieldValidatorsService], (service: ValidationFieldValidatorsService) => {
    service.updateValidators(undefined, <ValidationFormControl>{}, undefined);
  }));

  it('should set validators', inject([ValidationFieldValidatorsService], (service: ValidationFieldValidatorsService) => {
    let validatorsSet = false;
    let control = <ValidationFormControl><any>{
      clearValidators: () => { },
      clearAsyncValidators: () => { },
      setAsyncValidators: () => { },
      setValidators: () => {
        validatorsSet = true;
      }
    }
    service.updateValidators(undefined, control, { rules: {} });
  }));

  it('should set async validators', inject([ValidationFieldValidatorsService], (service: ValidationFieldValidatorsService) => {
    let asyncValidatorsSet = false;
    let control = <ValidationFormControl><any>{
      clearValidators: () => { },
      clearAsyncValidators: () => { },
      setAsyncValidators: () => {
        asyncValidatorsSet = true;
      },
      setValidators: () => { }
    }
    service.updateValidators(undefined, control, { rules: {} });
  }));
});

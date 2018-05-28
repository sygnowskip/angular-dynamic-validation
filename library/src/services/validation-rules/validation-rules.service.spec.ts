import { TestBed, inject } from '@angular/core/testing';

import { ValidationRulesService } from './validation-rules.service';

describe('RequiredValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationRulesService]
    });
  });

  it('should be created', inject([ValidationRulesService], (service: ValidationRulesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return undefined if rules are not set', () => {
    let service = new ValidationRulesService(undefined);

    let nonExisting;
    service.getValidation("non-existing-rules").subscribe((rules) => {
      nonExisting = rules == undefined;
    });
    expect(service).toBeTruthy();
  });

  it('should return rules if rules are set and model exists', () => {
    let service = new ValidationRulesService(() => {
      return {
        "existing-model": {
          fields: {
          }
        }
      };
    });

    let nonExisting;
    service.getValidation("existing-model").subscribe((rules) => {
      nonExisting = rules != undefined;
    });
    expect(service).toBeTruthy();
  });

  it('should return undefined if rules are set but model does not exists', () => {
    let service = new ValidationRulesService(() => {
      return {
        "existing-model": {
          fields: {

          }
        }
      };
    });

    let nonExisting;
    service.getValidation("non-existing-model").subscribe((rules) => {
      nonExisting = rules == undefined;
    });
    expect(service).toBeTruthy();
  });
});

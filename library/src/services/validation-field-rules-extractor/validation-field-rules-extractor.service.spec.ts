import { TestBed, inject } from '@angular/core/testing';

import { ValidationFieldRulesExtractorService } from './validation-field-rules-extractor.service';

describe('ValidationFieldRulesExtractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationFieldRulesExtractorService]
    });
  });

  it('should be created', inject([ValidationFieldRulesExtractorService], (service: ValidationFieldRulesExtractorService) => {
    expect(service).toBeTruthy();
  }));

  it('should return undefined for undefined rules', inject([ValidationFieldRulesExtractorService], (service: ValidationFieldRulesExtractorService) => {
    let rules = service.getRules("field", undefined);

    expect(rules).toBeUndefined();
  }));

  it('should return undefined for field that are undefined', inject([ValidationFieldRulesExtractorService], (service: ValidationFieldRulesExtractorService) => {
    let rules = service.getRules("non-existing-field", {
      "existing-field": {
        rules: {
          "required": {
            message: "Field required"
          }
        }
      }
    });

    expect(rules).toBeUndefined();
  }));

  it('should return undefined for field that are undefined', inject([ValidationFieldRulesExtractorService], (service: ValidationFieldRulesExtractorService) => {
    let rules = service.getRules("existing-field", {
      "existing-field": {
        rules: {
          "required": {
            message: "Field required"
          }
        }
      }
    });

    expect(rules).toBeDefined();
  }));
});

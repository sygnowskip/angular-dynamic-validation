import { TestBed, inject } from '@angular/core/testing';

import { ValidationFieldRefresherService } from './validation-field-refresher.service';

describe('ValidationFieldRefresherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationFieldRefresherService]
    });
  });

  it('should be created', inject([ValidationFieldRefresherService], (service: ValidationFieldRefresherService) => {
    expect(service).toBeTruthy();
  }));

  it('refreshValidationTriggered should be triggered', inject([ValidationFieldRefresherService], (service: ValidationFieldRefresherService) => {
    let called = false;
    let field = '';
    service.refreshValidationTriggered.subscribe((refreshedField) => {
      called = true;
      field = refreshedField;
    });
    service.refresh('test');

    expect(called).toBeTruthy();
    expect(field).toEqual('test');
  }));
});

import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';

import { ValidationFieldMessagesDefaultsService } from './validation-field-messages-defaults.service';

describe('ValidationFieldMessagesDefaultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationFieldMessagesDefaultsService]
    });
  });

  it('should be created', inject([ValidationFieldMessagesDefaultsService], (service: ValidationFieldMessagesDefaultsService) => {
    expect(service).toBeTruthy();
  }));

  it('should return undefined if default message is not registered', inject([ValidationFieldMessagesDefaultsService], (service: ValidationFieldMessagesDefaultsService) => {
    const defaultMessage = service.get('non-existing-error');
    expect(defaultMessage).toBeUndefined();
  }));

  it('should return default message if registered', inject([ValidationFieldMessagesDefaultsService], (service: ValidationFieldMessagesDefaultsService) => {
    const defaultMessage = service.get('required');

    expect(defaultMessage).toBeDefined();
  }));

  it('should set default message and return them', inject([ValidationFieldMessagesDefaultsService], (service: ValidationFieldMessagesDefaultsService) => {
    const testDefaultMessage = 'some string value';

    service.set('test-case', testDefaultMessage);
    const defaultMessage = service.get('test-case');

    expect(defaultMessage).toEqual(testDefaultMessage);
  }));
});

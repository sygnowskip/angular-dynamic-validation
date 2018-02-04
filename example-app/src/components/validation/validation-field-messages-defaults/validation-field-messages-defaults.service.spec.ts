import { TestBed, inject } from '@angular/core/testing';

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
});

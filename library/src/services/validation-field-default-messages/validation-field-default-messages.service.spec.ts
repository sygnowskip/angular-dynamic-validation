import { TestBed, inject } from '@angular/core/testing';

import { ValidationFieldDefaultMessagesService } from './validation-field-default-messages.service';

describe('ValidationFieldDefaultMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationFieldDefaultMessagesService]
    });
  });

  it('should be created', inject([ValidationFieldDefaultMessagesService], (service: ValidationFieldDefaultMessagesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return empty object if rules are undefined', inject([ValidationFieldDefaultMessagesService], (service: ValidationFieldDefaultMessagesService) => {
    let messages = service.getDefaultMessages(undefined);

    expect(messages).toBeDefined();
  }));

  it('should return object with default messages from rules', inject([ValidationFieldDefaultMessagesService], (service: ValidationFieldDefaultMessagesService) => {
    let defaultMessage = "Some default message";
    let exampleRule = "example-rule";
    let messages = service.getDefaultMessages({
      "example-rule": {
        message: defaultMessage
      }
    });

    expect(messages[exampleRule]).toEqual(defaultMessage);
  }));
});

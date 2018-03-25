import { TestBed, inject } from '@angular/core/testing';
import { ValidationRulesDefaultMessagesService } from './validation-rules-default-messages.service';

describe('ValidationRulesDefaultMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationRulesDefaultMessagesService]
    });
  });

  it('should be created', inject([ValidationRulesDefaultMessagesService], (service: ValidationRulesDefaultMessagesService) => {
    expect(service).toBeTruthy();
  }));

  it('should return undefined if default message is not registered', inject([ValidationRulesDefaultMessagesService], (service: ValidationRulesDefaultMessagesService) => {
    const defaultMessage = service.get('non-existing-error');
    expect(defaultMessage).toBeUndefined();
  }));

  it('should return default message if registered', inject([ValidationRulesDefaultMessagesService], (service: ValidationRulesDefaultMessagesService) => {
    const defaultMessage = service.get('required');

    expect(defaultMessage).toBeDefined();
  }));

  it('should set default message and return them', inject([ValidationRulesDefaultMessagesService], (service: ValidationRulesDefaultMessagesService) => {
    const testDefaultMessage = 'some string value';

    service.set('test-case', testDefaultMessage);
    const defaultMessage = service.get('test-case');

    expect(defaultMessage).toEqual(testDefaultMessage);
  }));
});

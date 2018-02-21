import { TestBed, inject } from '@angular/core/testing';

import { ServerErrorService } from './server-error.service';
import { FormMessagesCleanerService } from '../form-messages-cleaner/form-messages-cleaner.service';
import { ServerErrorReaderService, ServerBadRequestError, ServerValidationErrors, ServerValidationError } from '../server-error-reader/server-error-reader.service';

describe('ServerErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerErrorService,
        ServerErrorReaderService,
        FormMessagesCleanerService
      ]
    });
  });

  it('should be created', inject([ServerErrorService], (service: ServerErrorService) => {
    expect(service).toBeTruthy();
  }));

  it('should not call cleaner and validation error event if response is undefined', inject([ServerErrorService, FormMessagesCleanerService], (service: ServerErrorService, cleaner: FormMessagesCleanerService) => {
    var cleanerCalled = false;
    cleaner.formMessageCleanTriggered.subscribe(() => {
      cleanerCalled = true;
    });
    var errorEventCalled = false;
    service.validationErrorOccured.subscribe(() => {
      errorEventCalled = true;
    });

    service.catchBadRequest(undefined);

    expect(cleanerCalled).toBeFalsy();
    expect(errorEventCalled).toBeFalsy();
  }));

  it('should not call cleaner and validation error event if it is not a BadRequest', inject([ServerErrorService, FormMessagesCleanerService], (service: ServerErrorService, cleaner: FormMessagesCleanerService) => {
    var cleanerCalled = false;
    cleaner.formMessageCleanTriggered.subscribe(() => {
      cleanerCalled = true;
    });
    var errorEventCalled = false;
    service.validationErrorOccured.subscribe(() => {
      errorEventCalled = true;
    });
    var response = <ServerBadRequestError>{
      status: 500,
      error: {
        errors: undefined
      }
    }

    service.catchBadRequest(response);

    expect(cleanerCalled).toBeFalsy();
    expect(errorEventCalled).toBeFalsy();
  }));

  it('should not call cleaner and validation error event if it is a BadRequest but without errors', inject([ServerErrorService, FormMessagesCleanerService], (service: ServerErrorService, cleaner: FormMessagesCleanerService) => {
    var cleanerCalled = false;
    cleaner.formMessageCleanTriggered.subscribe(() => {
      cleanerCalled = true;
    });
    var errorEventCalled = false;
    service.validationErrorOccured.subscribe(() => {
      errorEventCalled = true;
    });
    var response = <ServerBadRequestError>{
      status: 400,
      error: {
        errors: undefined
      }
    }

    service.catchBadRequest(response);

    expect(cleanerCalled).toBeFalsy();
    expect(errorEventCalled).toBeFalsy();
  }));

  it('should call cleaner and validation error event if resposne is a BadRequest with errors', inject([ServerErrorService, FormMessagesCleanerService], (service: ServerErrorService, cleaner: FormMessagesCleanerService) => {
    var cleanerCalled = false;
    cleaner.formMessageCleanTriggered.subscribe(() => {
      cleanerCalled = true;
    });
    var errorEventCalled = false;
    service.validationErrorOccured.subscribe(() => {
      errorEventCalled = true;
    });
    var response = <ServerBadRequestError>{
      status: 400,
      error: {
        errors: [
          {
            property: "prop",
            message: "message"
          }
        ]
      }
    }

    service.catchBadRequest(response);

    expect(cleanerCalled).toBeTruthy();
    expect(errorEventCalled).toBeTruthy();
  }));

  it('should call validation error event for every error in response', inject([ServerErrorService, FormMessagesCleanerService], (service: ServerErrorService, cleaner: FormMessagesCleanerService) => {
    var errorEventCalled = 0;
    service.validationErrorOccured.subscribe(() => {
      errorEventCalled++;
    });
    var response = <ServerBadRequestError>{
      status: 400,
      error: {
        errors: [
          {
            property: "prop",
            message: "message"
          },
          {
            property: "prop",
            message: "message"
          },
          {
            property: "prop",
            message: "message"
          }
        ]
      }
    }

    service.catchBadRequest(response);

    expect(errorEventCalled).toEqual(response.error.errors.length);
  }));
});

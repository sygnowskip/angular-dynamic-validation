import { TestBed, inject } from '@angular/core/testing';

import { ServerErrorReaderService, ServerBadRequestError, ServerValidationErrors, ServerValidationError } from './server-error-reader.service';

describe('ServerErrorReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerErrorReaderService]
    });
  });

  it('should be created', inject([ServerErrorReaderService], (service: ServerErrorReaderService) => {
    expect(service).toBeTruthy();
  }));

  describe('getErrors tests', () => {
    it('should return undefined if error status is different than 400', inject([ServerErrorReaderService], (service: ServerErrorReaderService) => {
      const response = <ServerBadRequestError>{
        status: 500
      };

      const errors = service.getErrors(response);

      expect(errors).toBeUndefined();
    }));

    it('should return undefined if error status is 400, but without any errors', inject([ServerErrorReaderService], (service: ServerErrorReaderService) => {
      const response = <ServerBadRequestError>{
        status: 400
      };

      const errors = service.getErrors(response);

      expect(errors).toBeUndefined();
    }));

    it('should return all errors if status is 400', inject([ServerErrorReaderService], (service: ServerErrorReaderService) => {
      const error = <ServerValidationErrors>{
        errors: new Array<ServerValidationError>(
          <ServerValidationError>{ property: "test1", message: "test message 1" },
          <ServerValidationError>{ property: "test2", message: "test message 2" },
          <ServerValidationError>{ property: "test3", message: "test message 3" })
      };
      const response = <ServerBadRequestError>{
        status: 400,
        error: error
      };

      const errors = service.getErrors(response);

      expect(errors).toBeDefined();
      expect(errors.length).toEqual(error.errors.length);
    }));
  });

  describe('getFirstError tests', () => {
    it('should return undefined if error status is different than 400', inject([ServerErrorReaderService], (service: ServerErrorReaderService) => {
      const response = <ServerBadRequestError>{
        status: 500
      };

      const firstError = service.getFirstError(response);

      expect(firstError).toBeUndefined();
    }));

    it('should return undefined if error status is 400, but without any errors', inject([ServerErrorReaderService], (service: ServerErrorReaderService) => {
      const response = <ServerBadRequestError>{
        status: 400
      };

      const firstError = service.getFirstError(response);

      expect(firstError).toBeUndefined();
    }));

    it('should return only first error if status is 400', inject([ServerErrorReaderService], (service: ServerErrorReaderService) => {
      const error = <ServerValidationErrors>{
        errors: new Array<ServerValidationError>(
          <ServerValidationError>{ property: "test1", message: "test message 1" },
          <ServerValidationError>{ property: "test2", message: "test message 2" },
          <ServerValidationError>{ property: "test3", message: "test message 3" })
      };
      const response = <ServerBadRequestError>{
        status: 400,
        error: error
      };

      const firstError = service.getFirstError(response);

      expect(firstError).toBeDefined();
      expect(firstError.message).toEqual(error.errors[0].message);
      expect(firstError.property).toEqual(error.errors[0].property);
    }));
  });
});

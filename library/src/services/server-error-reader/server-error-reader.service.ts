import { Injectable } from '@angular/core';

export class ServerBadRequestError {
  public error: ServerValidationErrors;
  public status: number;
}

export class ServerValidationErrors {
  public errors: Array<ServerValidationError>;
}

export class ServerValidationError {
  public property: string;
  public message: string;
}

@Injectable()
export class ServerErrorReaderService {
  private readonly badRequestStatus = 400;

  constructor() { }

  public getFirstError(response: ServerBadRequestError): ServerValidationError | undefined {
    const errors = this.getErrors(response);
    if (!errors || errors.length === 0) {
      return undefined;
    }

    return errors[0];
  }

  public getErrors(response: ServerBadRequestError): Array<ServerValidationError> | undefined {
    if (!response) {
      return undefined;
    }
    if (response.status !== this.badRequestStatus) {
      return undefined;
    }

    if (!response.error || !response.error.errors) {
      return undefined;
    }

    return response.error.errors;
  }
}

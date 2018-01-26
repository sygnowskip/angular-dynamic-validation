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

  public getErrors(response: ServerBadRequestError): Array<ServerValidationError> | undefined {
    if (response.status !== this.badRequestStatus) {
      return undefined;
    }

    if (!response.error || !response.error.errors) {
      return undefined;
    }

    return response.error.errors;
  }
}

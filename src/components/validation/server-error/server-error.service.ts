import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ServerErrorReaderService, ServerBadRequestError, ServerValidationError } from '../server-error-reader/server-error-reader.service';
import { error } from 'selenium-webdriver';

@Injectable()
export class ServerErrorService {
  private validationErrorEvent = new Subject<ServerValidationError>();

  public validationErrorOccured = this.validationErrorEvent.asObservable();

  constructor(
    private serverErrorReader: ServerErrorReaderService
  ) { }

  public catchBadRequest(badRequest: ServerBadRequestError) {
    const errors = this.serverErrorReader.getErrors(badRequest);
    if (!errors) {
      return;
    }

    for (let i = 0; i < errors.length; i++) {
      this.validationErrorEvent.next(errors[i]);
    }
  }
}
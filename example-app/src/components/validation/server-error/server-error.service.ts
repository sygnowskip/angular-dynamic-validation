import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ServerErrorReaderService, ServerBadRequestError, ServerValidationError } from '../server-error-reader/server-error-reader.service';
import { error } from 'selenium-webdriver';
import { FormMessagesCleanerService } from '../form-messages-cleaner/form-messages-cleaner.service';

@Injectable()
export class ServerErrorService {
  private validationErrorEvent = new Subject<ServerValidationError>();

  public validationErrorOccured = this.validationErrorEvent.asObservable();

  constructor(
    private serverErrorReader: ServerErrorReaderService,
    private formMessagesCleaner: FormMessagesCleanerService
  ) { }

  public catchBadRequest(badRequest: ServerBadRequestError) {
    const errors = this.serverErrorReader.getErrors(badRequest);
    if (!errors) {
      return;
    }

    this.formMessagesCleaner.clean();
    for (let i = 0; i < errors.length; i++) {
      this.validationErrorEvent.next(errors[i]);
    }
  }
}

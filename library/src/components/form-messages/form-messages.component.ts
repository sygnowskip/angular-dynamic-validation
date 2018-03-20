import { Component, OnInit, SkipSelf, Host, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ServerErrorService } from '../../services/server-error/server-error.service';
import { FormMessagesCleanerService } from '../../services/form-messages-cleaner/form-messages-cleaner.service';
import { ServerValidationError } from '../../services/server-error-reader/server-error-reader.service';

@Component({
  selector: 'form-messages',
  templateUrl: './form-messages.component.html'
})
export class FormMessagesComponent implements OnInit {
  private errorMessages: Array<string> = new Array<string>();

  constructor(
    @Host() @SkipSelf() @Optional() private formGroupDirective: FormGroupDirective,
    private serverErrors: ServerErrorService,
    private cleaner: FormMessagesCleanerService
  ) {  }

  ngOnInit() {
    this.catchServerErrors();
    this.bindCleaner();
  }

  private bindCleaner() {
    this.cleaner.formMessageCleanTriggered.subscribe(() => {
      this.errorMessages = new Array<string>();
    });
  }

  private catchServerErrors() {
    this.serverErrors.validationErrorOccured.subscribe((error: ServerValidationError) => {
      if (this.isUnassignedError(error)) {
        this.errorMessages.push(error.message);
      }
    });
  }

  private isUnassignedError(error: ServerValidationError): boolean {
    return !this.formGroupDirective || !error.property || !this.formGroupDirective.form.controls[error.property];
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormMessagesCleanerService {
  private cleanFormMessagesEvent = new Subject<void>();

  public formMessageCleanTriggered = this.cleanFormMessagesEvent.asObservable();

  public clean() {
    this.cleanFormMessagesEvent.next();
  }
}

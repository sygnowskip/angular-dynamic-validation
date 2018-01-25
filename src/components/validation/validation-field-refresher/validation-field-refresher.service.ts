import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ValidationFieldRefresherService {
  private refreshValidationForPropertyEvent = new Subject<string>();

  public refreshValidationTriggered = this.refreshValidationForPropertyEvent.asObservable();

  constructor() { }

  public refresh(field: string) {
    this.refreshValidationForPropertyEvent.next(field);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ValidationFieldRefresherService {
  private refreshValidationForPropertyEvent = new Subject<string>();

  public refreshValidationTriggered = this.refreshValidationForPropertyEvent.asObservable();

  public refresh(field: string) {
    this.refreshValidationForPropertyEvent.next(field);
  }
}

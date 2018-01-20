import { Directive, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { IValidationFields } from '../types';
import { OnInit, OnChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Directive({
  selector: '[formGroupValidationRules]'
})
export class FormGroupValidationRulesDirective implements OnInit, OnChanges {
  @Input('formGroupValidationRules')
  public rules: IValidationFields | undefined = undefined;

  private validationRulesChangedEvent = new Subject<IValidationFields | undefined>();
  public validationRulesChanged = this.validationRulesChangedEvent.asObservable();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty("rules") && !!changes["rules"].currentValue) {
      this.validationRulesChangedEvent.next(this.rules);
    }
  }

}

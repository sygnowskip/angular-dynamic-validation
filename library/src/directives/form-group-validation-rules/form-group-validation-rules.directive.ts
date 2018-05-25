import { Directive, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { IValidationFields } from '../../models/base-validation-rule/base-validation-rule.model';

@Directive({
  selector: '[formGroupValidationRules]'
})
export class FormGroupValidationRulesDirective implements OnChanges {
  @Input('formGroupValidationRules')
  public rules: IValidationFields | undefined = undefined;

  private validationRulesChangedEvent = new Subject<IValidationFields | undefined>();
  public validationRulesChanged = this.validationRulesChangedEvent.asObservable();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty("rules") && !!changes["rules"].currentValue) {
      this.validationRulesChangedEvent.next(this.rules);
    }
  }

}

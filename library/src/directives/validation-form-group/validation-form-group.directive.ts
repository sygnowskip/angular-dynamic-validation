import { Subject } from 'rxjs';
import { ValidationRulesService } from './../../services/validation-rules/validation-rules.service';
import { ControlContainer } from "@angular/forms";
import { FormGroupDirective } from "@angular/forms";
import { forwardRef } from "@angular/core";
import { Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { Optional } from "@angular/core";
import { Self } from "@angular/core";
import { Inject } from "@angular/core";
import { NG_ASYNC_VALIDATORS } from "@angular/forms";
import { NG_VALIDATORS } from "@angular/forms";
import { HostListener } from '@angular/core';
import { IValidationFields } from '../../models/base-validation-rule/base-validation-rule.model';

export const controlContainerProvider: any = {
  provide: ControlContainer,
  useExisting: forwardRef(() => ValidationFormGroupDirective)
};

export const formGroupDirectiveProvider: any = {
  provide: FormGroupDirective,
  useExisting: forwardRef(() => ValidationFormGroupDirective)
};

@Directive({
  selector: '[validationFormGroup]',
  providers: [controlContainerProvider, formGroupDirectiveProvider],
  exportAs: 'ngForm'
})
export class ValidationFormGroupDirective extends FormGroupDirective implements OnInit {
  @Input('validationFormGroup')
  public form: FormGroup;

  @Input()
  public name: string;

  private validationRulesChangedEvent = new Subject<IValidationFields | undefined>();
  public validationRulesChanged = this.validationRulesChangedEvent.asObservable();

  public rules: IValidationFields | undefined;

  @HostListener('submit', ['$event']) submit($event) {
    return super.onSubmit($event);
  }

  @HostListener('reset') reset() {
    return super.onReset();
  }

  constructor(
    @Optional() @Self() @Inject(NG_VALIDATORS) _validators: any[],
    @Optional() @Self() @Inject(NG_ASYNC_VALIDATORS) _asyncValidators: any[],
    private validationRulesService: ValidationRulesService) {
    super(_validators, _asyncValidators);
  }

  ngOnInit(): void {
    this.validationRulesService.getValidation(this.name).subscribe((rules: IValidationFields | undefined) => {
      this.rules = rules;
      this.validationRulesChangedEvent.next(rules);
    });
  }
}

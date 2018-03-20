import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { IValidationRules, IValidationFields } from '../../models/base-validation-rule/base-validation-rule.model';

@Injectable()
export class ValidationRulesService {
  public static readonly VALIDATION_RULES: string = 'validationRules';

  constructor(
    @Optional() @Inject(ValidationRulesService.VALIDATION_RULES) private validationRules: IValidationRules
  ) { }

  public getValidation(model: string): Observable<IValidationFields | undefined> {
    if (this.validationRules) {
      return Observable.of(this.process(this.validationRules, model));
    } else {
      console.error("Cannot resolve validation rules, you probably missing registration in your app.module.ts:\n" +
        "e.g. `{ provide: ValidationRulesService.VALIDATION_RULES, useValue: validationRules }` in `providers` section");
        return Observable.of<IValidationFields>();
    }
  }

  private process(rules: IValidationRules, model: string): IValidationFields | undefined {
    if (!rules[model]){
      return undefined;
    }

    return rules[model].fields;
  }
}

import { Observable } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IValidationRules, IValidationFields } from '../../models/base-validation-rule/base-validation-rule.model';

@Injectable()
export class ValidationRulesService {
  public static readonly VALIDATION_RULES: string = 'validationRules';
  private readonly validationRules: IValidationRules;

  constructor(
    @Optional() @Inject(ValidationRulesService.VALIDATION_RULES) validationRulesFactory: () => IValidationRules
  ) {
    if (!validationRulesFactory) {
      console.error("Cannot resolve validation rules, you probably missing registration in your app.module.ts:\n" +
        "e.g. `{ provide: ValidationRulesService.VALIDATION_RULES, useFactory: () => validationRules ) }` in `providers` section");
      return;
    }

    this.validationRules = validationRulesFactory();
  }

  public getValidation(model: string): Observable<IValidationFields | undefined> {
    if (this.validationRules) {
      return of(this.process(this.validationRules, model));
    } else {
      return of<IValidationFields>();
    }
  }

  private process(rules: IValidationRules, model: string): IValidationFields | undefined {
    if (!rules[model]) {
      return undefined;
    }

    return rules[model].fields;
  }
}

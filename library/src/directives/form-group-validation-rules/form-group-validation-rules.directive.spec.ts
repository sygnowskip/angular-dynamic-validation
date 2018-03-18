import { FormGroupValidationRulesDirective } from './form-group-validation-rules.directive';
import { SimpleChanges } from '@angular/core';

describe('FormGroupValidationRulesDirective', () => {
  it('should create an instance', () => {
    const directive = new FormGroupValidationRulesDirective();
    expect(directive).toBeTruthy();
  });

  it('should throw event if rules changed', () => {
    const directive = new FormGroupValidationRulesDirective();
    let changed = false;
    directive.validationRulesChanged.subscribe(() => {
      changed = true;
    })
    let changes = <SimpleChanges><any>{
      "rules": {
        "currentValue": {}
      }
    }
    directive.ngOnChanges(changes);

    expect(changed).toBeTruthy();
  });

  it('should not throw event if value set to rules is undefined', () => {
    const directive = new FormGroupValidationRulesDirective();
    let changed = false;
    directive.validationRulesChanged.subscribe(() => {
      changed = true;
    })
    let changes = <SimpleChanges><any>{
      "rules": {
        "currentValue": undefined
      }
    }
    directive.ngOnChanges(changes);

    expect(changed).toBeFalsy();
  });
});

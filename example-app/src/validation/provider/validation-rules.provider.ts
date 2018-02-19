import { IValidationRules } from '../../components/validation/types';
import * as validationRules from './../rules.json';
import customValidationRules from './../custom-rules';


export class ValidationRulesProvider {
  constructor(private objectMerge: ObjectMergeService) { }
  static getRules(): IValidationRules {
    return ObjectMergeService.deepMerge(validationRules, customValidationRules);
  }
}

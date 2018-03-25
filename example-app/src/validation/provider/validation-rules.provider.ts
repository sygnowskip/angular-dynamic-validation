import { IValidationRules, ObjectMergeService } from 'angular-dynamic-validation';
import * as validationRules from './../rules.json';
import customValidationRules from './../custom-rules';


export function getValidationRules(objectMerge: ObjectMergeService) {
  return objectMerge.deepMerge(validationRules, customValidationRules);
}

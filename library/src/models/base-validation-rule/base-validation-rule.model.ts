export interface IValidationRules {
  [model: string]: { fields: IValidationFields };
}

export interface IValidationFields {
  [fieldName: string]: { rules: IValidationFieldRules; };
}

export interface IValidationFieldRules {
  [ruleName: string]: IBaseValidationRule | undefined;

  required?: IRequiredValidationRule;
  length?: ILengthValidationRule;
  regex?: IPatternValidationRule;
  greaterThan?: INumericValidationRule;
  greaterThanOrEqual?: INumericValidationRule;
  lessThan?: INumericValidationRule;
  lessThanOrEqual?: INumericValidationRule;
  equal?: INumericValidationRule;
  notEqual?: INumericValidationRule;
}

export interface IBaseValidationRule {
  message?: string;
}

export interface ILengthValidationRule extends IBaseValidationRule {
  min?: number;
  max?: number;
}

export interface INumericValidationRule extends IBaseValidationRule {
  value?: number;
}

export interface IPatternValidationRule extends IBaseValidationRule {
  regex?: string;
  ignoreCase?: boolean;
}

export interface IRequiredValidationRule extends IBaseValidationRule {
  required?: boolean;
}

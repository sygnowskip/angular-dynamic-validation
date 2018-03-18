import { ManualConditionalValidator } from './manual-conditional-validator.service';

describe('RequiredValidatorService', () => {
  it('should execute validator if condition pass', () => {
    let executed = false;
    let trueCondition = () => true;
    ManualConditionalValidator.validator(trueCondition, () => {
      executed = true;
      return null;
    })(null);

    expect(executed).toBeTruthy();
  }));

  it('should not execute validator if condition fail', () => {
    let executed = false;
    let trueCondition = () => false;
    ManualConditionalValidator.validator(trueCondition, () => {
      executed = true;
      return null;
    })(null);

    expect(executed).toBeFalsy();
  }));
});

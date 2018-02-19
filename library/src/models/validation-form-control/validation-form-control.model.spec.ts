import { ValidationFormControl } from "./validation-form-control.model";

describe('ValidationFormControl', () => {
  it('should store passed validators', () => {
    const validationFormControl = new ValidationFormControl(undefined, [], []);

    expect(validationFormControl.manualAppliedAsyncValidators).toBeDefined();
    expect(validationFormControl.manualAppliedValidators).toBeDefined();
  });

  it('should store validators passsed as options object', () => {
    const validationFormControl = new ValidationFormControl(undefined, {
      validators: [],
      asyncValidators: []
    });

    expect(validationFormControl.manualAppliedAsyncValidators).toBeDefined();
    expect(validationFormControl.manualAppliedValidators).toBeDefined();
  });
});

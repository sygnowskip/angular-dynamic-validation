import { Injectable } from "@angular/core";
import { AvailableValidators } from "../validators-factory/validators-factory.service";
import { RequiredValidatorService } from "../validators-factory/validators/required/required-validator.service";
import { ValidationFieldMessagesDefaults } from "../validation-field-messages-defaults/validation-field-messages-defaults.service";

export function defaultErrorMessagesConfiguration(validationFieldMessagesDefaults: ValidationFieldMessagesDefaults) {
  validationFieldMessagesDefaults.set("required", "This field is required (overwritten message)");
}

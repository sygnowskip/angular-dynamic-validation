import { Injectable } from "@angular/core";
import { AvailableValidators } from "../validators-factory/validators-factory.service";
import { RequiredValidatorService } from "../validators-factory/validators/required/required-validator.service";

export function registerCustomValidators() {
  AvailableValidators.register('required', RequiredValidatorService);
}

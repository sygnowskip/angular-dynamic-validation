import { Injectable } from "@angular/core";
import { AvailableValidatorsService } from "angular-dynamic-validation";
import { ExampleCustomValidatorService } from "./custom-validators/example-custom-validator.service";

export function registerCustomValidators(availableValidators: AvailableValidatorsService) {
  availableValidators.register('custom-validator', ExampleCustomValidatorService);
}

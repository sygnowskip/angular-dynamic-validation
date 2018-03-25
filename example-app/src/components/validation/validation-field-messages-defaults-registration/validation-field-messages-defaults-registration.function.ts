import { Injectable } from "@angular/core";
import { ValidationRulesDefaultMessagesService } from "angular-dynamic-validation";

export function defaultErrorMessagesConfiguration(validationRulesDefaultMessages: ValidationRulesDefaultMessagesService) {
  validationRulesDefaultMessages.set("required", "This field is required (overwritten message)");
}

import { Validator } from "./validator.model";

export interface IValidatorsDefinition {
  [name: string]: Validator | undefined;
}

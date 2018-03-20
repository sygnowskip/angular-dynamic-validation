import { NgModule } from '@angular/core';
import { ServerErrorReaderService } from './services/server-error-reader/server-error-reader.service';
import { AvailableValidatorsService } from './services/available-validators/available-validators.service';
import { ValidatorsFactoryService } from './services/validators-factory/validators-factory.service';
import { ObjectMergeService } from './services/object-merge/object-merge.service';
import { FormMessagesCleanerService } from './services/form-messages-cleaner/form-messages-cleaner.service';
import { ValidationFieldRefresherService } from './services/validation-field-refresher/validation-field-refresher.service';
import { ValidationFieldMessagesDefaultsService } from './services/validation-field-messages-defaults/validation-field-messages-defaults.service';
import { FormGroupValidationRulesDirective } from './directives/form-group-validation-rules/form-group-validation-rules.directive';
import { ServerErrorService } from './services/server-error/server-error.service';
import { ValidationRulesService } from './services/validation-rules/validation-rules.service';
import { RequiredValidatorService } from './validators/generic/required/required-validator.service';
import { ValidationFieldControlService } from './services/validation-field-control/validation-field-control.service';
import { ValidationFieldValidatorsService } from './services/validation-field-validators/validation-field-validators.service';
import { FormMessagesComponent } from './components/form-messages/form-messages.component';
import { ValidationFieldMessagesComponent } from './components/validation-field-messages/validation-field-messages.component';
import { ObjectKeysPipe } from './pipes/object-keys-pipe/object-keys.pipe';


@NgModule({
  providers: [
    ServerErrorReaderService,
    AvailableValidatorsService,
    ValidatorsFactoryService,
    ObjectMergeService,
    FormMessagesCleanerService,
    ValidationFieldRefresherService,
    ValidationFieldMessagesDefaultsService,
    FormGroupValidationRulesDirective,
    ServerErrorService,
    ValidationRulesService,
    RequiredValidatorService,
    ValidationFieldControlService,
    ValidationFieldValidatorsService
  ],
  declarations: [
    FormMessagesComponent,
    ValidationFieldMessagesComponent,
    ObjectKeysPipe
  ],
  exports: [
    ObjectKeysPipe
  ]
})
export class ValidationModule {
}

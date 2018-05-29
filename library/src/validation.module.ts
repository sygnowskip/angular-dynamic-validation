import { NgModule } from '@angular/core';
import { ServerErrorReaderService } from './services/server-error-reader/server-error-reader.service';
import { AvailableValidatorsService } from './services/available-validators/available-validators.service';
import { ValidatorsFactoryService } from './services/validators-factory/validators-factory.service';
import { ObjectMergeService } from './services/object-merge/object-merge.service';
import { FormMessagesCleanerService } from './services/form-messages-cleaner/form-messages-cleaner.service';
import { ValidationFieldRefresherService } from './services/validation-field-refresher/validation-field-refresher.service';
import { ValidationRulesDefaultMessagesService } from './services/validation-rules-default-messages/validation-rules-default-messages.service';
import { ServerErrorService } from './services/server-error/server-error.service';
import { ValidationRulesService } from './services/validation-rules/validation-rules.service';
import { RequiredValidatorService } from './validators/generic/required/required-validator.service';
import { ValidationFieldControlService } from './services/validation-field-control/validation-field-control.service';
import { ValidationFieldValidatorsService } from './services/validation-field-validators/validation-field-validators.service';
import { ValidationFieldRulesExtractorService } from './services/validation-field-rules-extractor/validation-field-rules-extractor.service';
import { FormMessagesComponent } from './components/form-messages/form-messages.component';
import { ValidationFieldMessagesComponent } from './components/validation-field-messages/validation-field-messages.component';
import { ObjectKeysPipe } from './pipes/object-keys-pipe/object-keys.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ValidationFieldComponent } from './components/validation-field/validation-field.component';
import { ValidationFieldDefaultMessagesService } from './services/validation-field-default-messages/validation-field-default-messages.service';
import { ValidationFormGroupDirective } from './directives/validation-form-group/validation-form-group.directive';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [
    ServerErrorReaderService,
    AvailableValidatorsService,
    ValidatorsFactoryService,
    ObjectMergeService,
    FormMessagesCleanerService,
    ValidationFieldRefresherService,
    ValidationRulesDefaultMessagesService,
    ServerErrorService,
    ValidationRulesService,
    RequiredValidatorService,
    ValidationFieldControlService,
    ValidationFieldValidatorsService,
    ValidationFieldRulesExtractorService,
    ValidationFieldDefaultMessagesService
  ],
  declarations: [
    FormMessagesComponent,
    ValidationFieldMessagesComponent,
    ValidationFieldComponent,
    ObjectKeysPipe,
    ValidationFormGroupDirective
  ],
  exports: [
    FormMessagesComponent,
    ValidationFieldMessagesComponent,
    ValidationFieldComponent,
    ObjectKeysPipe,
    ValidationFormGroupDirective
  ]
})
export class ValidationModule {
}

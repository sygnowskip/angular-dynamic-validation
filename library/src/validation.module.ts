import { NgModule } from '@angular/core';
import { FormMessagesComponent, ValidationFieldMessagesComponent } from './components';
import { ObjectKeysPipe } from './pipes';
import {
  ServerErrorReaderService, AvailableValidatorsService, ValidatorsFactoryService,
  ObjectMergeService, FormMessagesCleanerService, ValidationFieldRefresherService,
  ValidationFieldMessagesDefaultsService, ServerErrorService, ValidationRulesService
} from './services';
import { FormGroupValidationRulesDirective } from './directives';
import { RequiredValidatorService } from './validators';


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
    RequiredValidatorService
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

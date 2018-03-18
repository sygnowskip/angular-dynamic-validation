import { NgModule } from '@angular/core';
import { ValidationModuleTestComponent, FormMessagesComponent, ValidationFieldMessagesComponent } from './components';
import { ObjectKeysPipe } from './pipes';
import {
  ServerErrorReaderService, AvailableValidatorsService, ValidatorsFactoryService,
  ObjectMergeService, FormMessagesCleanerService, ValidationFieldRefresherService,
  ValidationFieldMessagesDefaultsService, ServerErrorService, ValidationRulesService
} from './services';
import { FormGroupValidationRulesDirective } from './directives';

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
    ValidationRulesService
  ],
  declarations: [
    FormMessagesComponent,
    ValidationModuleTestComponent,
    ValidationFieldMessagesComponent,
    ObjectKeysPipe
  ],
  exports: [
    ValidationModuleTestComponent,
    ObjectKeysPipe
  ]
})
export class ValidationModule {
}

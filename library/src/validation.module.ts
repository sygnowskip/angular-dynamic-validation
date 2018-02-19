import { NgModule } from '@angular/core';
import { ValidationModuleTestComponent } from './components';
import { ObjectKeysPipe } from './pipes';
import { ServerErrorReaderService, AvailableValidatorsService, ValidatorsFactoryService, ObjectMergeService, FormMessagesCleanerService } from './services';

@NgModule({
  providers: [
    ServerErrorReaderService,
    AvailableValidatorsService,
    ValidatorsFactoryService,
    ObjectMergeService,
    FormMessagesCleanerService
  ],
  declarations: [
    ValidationModuleTestComponent,
    ObjectKeysPipe
  ],
  exports: [
    ValidationModuleTestComponent,
    ObjectKeysPipe
  ]
})
export class ValidationModule {
}

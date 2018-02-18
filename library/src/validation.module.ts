import { NgModule } from '@angular/core';
import { ValidationModuleTestComponent } from './components';
import { ObjectKeysPipe } from './pipes';
import { ServerErrorReaderService, AvailableValidatorsService, ValidatorsFactoryService } from './services';

@NgModule({
  providers: [
    ServerErrorReaderService,
    AvailableValidatorsService,
    ValidatorsFactoryService
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

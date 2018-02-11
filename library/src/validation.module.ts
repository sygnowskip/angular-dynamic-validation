import { NgModule } from '@angular/core';
import { ValidationModuleTestComponent } from './components';
import { ServerErrorReaderService, ObjectKeysPipe } from './';

@NgModule({
  providers: [
    ServerErrorReaderService
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

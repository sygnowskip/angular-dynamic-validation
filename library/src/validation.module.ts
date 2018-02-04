import { NgModule } from '@angular/core';
import { ValidationModuleTestComponent } from './components';

@NgModule({
  providers: [
  ],
  declarations: [
    ValidationModuleTestComponent
  ],
  exports: [
    ValidationModuleTestComponent
  ]
})
export class ValidationModule {
}

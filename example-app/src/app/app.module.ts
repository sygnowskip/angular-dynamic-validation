import { getValidationRules } from '../validation/provider/validation-rules.provider';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import * as validationRules from './../validation/rules.json';
import { registerCustomValidators } from '../components/validation/custom-validators-registration/custom-validators-registration.function';
import { defaultErrorMessagesConfiguration } from '../components/validation/validation-field-messages-defaults-registration/validation-field-messages-defaults-registration.function';

import { ValidationModule, ValidationRulesDefaultMessagesService, ValidationRulesService, ObjectMergeService, AvailableValidatorsService } from 'angular-dynamic-validation';
import { ExampleCustomValidatorService } from '../components/validation/custom-validators-registration/custom-validators/example-custom-validator.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ValidationModule
  ],
  providers: [
    {
      provide: ValidationRulesService.VALIDATION_RULES,
      useFactory: (objectMerge: ObjectMergeService) => () => getValidationRules(objectMerge),
      deps: [ObjectMergeService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (availableValidators: AvailableValidatorsService) => () => registerCustomValidators(availableValidators),
      deps: [AvailableValidatorsService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (validationFieldMessagesDefaults: ValidationRulesDefaultMessagesService) => () => defaultErrorMessagesConfiguration(validationFieldMessagesDefaults),
      deps: [ValidationRulesDefaultMessagesService],
      multi: true
    },
    ExampleCustomValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

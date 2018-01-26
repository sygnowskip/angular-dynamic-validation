import {
  registerCustomValidators,
} from '../components/validation/custom-validators-registration/custom-validators-registration.service';
import {
  RequiredValidatorService,
} from '../components/validation/validators-factory/validators/required/required-validator.service';
import { ValidatorsFactoryService } from '../components/validation/validators-factory/validators-factory.service';

import { ValidationRulesService } from '../components/validation/validation-rules.service';
import { ValidationRulesProvider } from '../validation/provider/validation-rules.provider';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ValidationFieldComponent } from '../components/validation/validation-field/validation-field.component';
import {
  FormGroupValidationRulesDirective,
} from '../components/validation/form-group-validation-rules/form-group-validation-rules.directive';

import * as validationRules from './../validation/rules.json';
import { ValidationFieldRefresherService } from '../components/validation/validation-field-refresher/validation-field-refresher.service';
import { ServerErrorReaderService } from '../components/validation/server-error-reader/server-error-reader.service';
import { ServerErrorService } from '../components/validation/server-error/server-error.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ValidationFieldComponent,
    FormGroupValidationRulesDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: ValidationRulesService.VALIDATION_RULES, useValue: ValidationRulesProvider.getRules() },
    ValidationRulesService,
    ValidatorsFactoryService,
    RequiredValidatorService,
    ValidationFieldRefresherService,
    { provide: APP_INITIALIZER, useValue: registerCustomValidators, multi: true },
    ServerErrorReaderService,
    ServerErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// 1. Czytanie błędów z odpowiedzi z serwera i przypisywanie do pól
// 2. Komponent na wiadomości pod polem
// 3. Komponent na wiadomości nie przypisane do pól
// 4. Oznaczanie pól wymaganych

// 5. Paczka
// 6. Przykładowa aplikacja z wykorzystaniem paczki

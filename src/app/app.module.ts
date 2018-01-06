import { ValidationRulesService } from '../components/validation/validation-rules.service';
import { ValidationRulesProvider } from '../validation/provider/validation-rules.provider';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ValidationFieldComponent } from '../components/validation/validation-field/validation-field.component';

import * as validationRules from './../validation/rules.json';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ValidationFieldComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    // { provide: ValidationRulesService.VALIDATION_RULES, useValue: validationRules },
    ValidationRulesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

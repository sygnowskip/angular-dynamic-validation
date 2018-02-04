import { ValidationRulesService } from '../../components/validation/validation-rules.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IValidationFields } from '../../components/validation/types';
import { ValidationFormControl } from '../../components/validation/validation-form-control/validation-form-control.model';
import { ValidationFieldRefresherService } from '../../components/validation/validation-field-refresher/validation-field-refresher.service';
import { HttpClient } from '@angular/common/http';
import { CustomValidators } from '../../components/validation/validators-factory/validators/conditional-validator/conditional-validator.service';
import { ServerErrorService } from '../../components/validation/server-error/server-error.service';

export class HomeModel {
  public name: string;
  public surname: string;
  public isSurnameRequired: boolean;
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
  public model: HomeModel;
  public rules: IValidationFields;

  constructor(
    private validationRulesService: ValidationRulesService,
    private validationRefresher: ValidationFieldRefresherService,
    private http: HttpClient,
    private serverErrors: ServerErrorService
  ) {
  }

  ngOnInit() {
    this.model = new HomeModel();
    this.form = new FormGroup({
      surname: new ValidationFormControl('', [CustomValidators.conditionalValidator(() => this.model.isSurnameRequired, Validators.required)]),
      isSurnameRequired: new ValidationFormControl()
    });
    this.validationRulesService.getValidation("exampleModel").subscribe(rules => {
      if (rules) {
        this.rules = rules;
      }
    });

    this.form.valueChanges.subscribe((changes: any) => {
      // TODO Iterate over and find changed properties
    });
  }

  private callApi(): void {
    this.http.post('http://localhost:4201/api/without-errors', undefined).subscribe(
      data => {
      },
      error => this.serverErrors.catchBadRequest(error)
    );

    this.http.post('http://localhost:4201/api/with-errors', undefined).subscribe(
      data => {
      },
      error => this.serverErrors.catchBadRequest(error)
    );
  }

  onSubmit() {
    this.callApi();
  }

  public checkboxChanged() {
    this.validationRefresher.refresh('surname');
  }

}

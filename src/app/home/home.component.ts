import { ValidationRulesService } from '../../components/validation/validation-rules.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IValidationFields } from '../../components/validation/types';
import { ValidationFormControl } from '../../components/validation/validation-form-control/validation-form-control.model';
import { CustomValidators } from '../../components/validation/conditional-validator/conditional-validator.service';
import { ValidationFieldRefresherService } from '../../components/validation/validation-field-refresher/validation-field-refresher.service';

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
    private validationRefresher: ValidationFieldRefresherService
  ) {
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

  ngOnInit() {
  }

  onSubmit() {
    return false;
  }

  public checkboxChanged() {
    this.validationRefresher.refresh('surname');
  }

}

import { ValidationRulesService } from '../../components/validation/validation-rules.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IValidationFields } from '../../components/validation/types';
import { ValidationFormControl } from '../../components/validation/validation-form-control/validation-form-control.model';

export class HomeModel {
  public name: string;
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
    private validationRulesService: ValidationRulesService
  ) {
    this.model = new HomeModel();
    this.form = new FormGroup({
      surname: new ValidationFormControl('', [Validators.required])
    });
    this.validationRulesService.getValidation("exampleModel").subscribe(rules => {
      if (rules) {
        this.rules = rules;
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    return false;
  }

}

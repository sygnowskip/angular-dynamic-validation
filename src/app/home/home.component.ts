import { ValidationRulesService } from '../../components/validation/validation-rules.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(
    private validationRulesService: ValidationRulesService
  ) {
    this.model = new HomeModel();
    this.form = new FormGroup({});
    this.validationRulesService.getValidation("exampleModel").subscribe(rules => {
      console.log(rules);
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    debugger;
    return false;
  }

}

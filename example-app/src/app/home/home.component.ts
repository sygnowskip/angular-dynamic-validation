import { IValidationFields, ServerErrorService, ValidationFormControl } from 'angular-dynamic-validation';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export class HomeModel {
  public name: string;
  public surname: string;
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
    private http: HttpClient,
    private serverErrors: ServerErrorService
  ) {
  }

  ngOnInit() {
    this.model = new HomeModel();
    this.form = new FormGroup({
      name: new ValidationFormControl(),
      surname: new ValidationFormControl()
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
    if (this.form.invalid) {
      return;
    }

    this.callApi();
  }
}

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
  ) {
    this.model = new HomeModel();
    this.form = new FormGroup({
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    debugger;
    return false;
  }

}

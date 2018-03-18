import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { FormMessagesComponent } from './form-messages.component';
import { FormMessagesCleanerService, ServerErrorService, ServerErrorReaderService, ServerBadRequestError } from '../..';
import { FormGroupDirective } from '@angular/forms';

describe('FormMessagesComponent', () => {
  let component: FormMessagesComponent;
  let fixture: ComponentFixture<FormMessagesComponent>;

  let serverErrorService: ServerErrorService;
  let formMessagesCleanerService: FormMessagesCleanerService;

  let formDirective = {
    form: {
      controls: {
        firstName: {}
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormMessagesComponent
      ],
      providers: [
        ServerErrorReaderService,
        ServerErrorService,
        FormMessagesCleanerService,
        { provide: FormGroupDirective, useValue: formDirective }
      ]
    });

    fixture = TestBed.createComponent(FormMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serverErrorService = TestBed.get(ServerErrorService);
    formMessagesCleanerService = TestBed.get(FormMessagesCleanerService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display errors without properties', () => {
    let badRequest = <ServerBadRequestError>{
      status: 400,
      error: {
        errors: [
          {
            property: "firstName",
            message: "This field is required"
          },
          {
            message: "This field is required"
          },
          {
            message: "This field is required too"
          }
        ]
      }
    }
    serverErrorService.catchBadRequest(badRequest);
    fixture.detectChanges();

    var errorsCount = fixture.debugElement.queryAll(By.css('li')).length;
    expect(errorsCount).toEqual(2);
  });

  it('should display errors for fields that are not found in form', () => {
    let badRequest = <ServerBadRequestError>{
      status: 400,
      error: {
        errors: [
          {
            property: "non-existing-filed",
            message: "This field is required"
          },
          {
            message: "This field is required"
          }
        ]
      }
    }
    serverErrorService.catchBadRequest(badRequest);
    fixture.detectChanges();

    var errorsCount = fixture.debugElement.queryAll(By.css('li')).length;
    expect(errorsCount).toEqual(2);
  });

  it('should remove all errors after form clean up', () => {
    let badRequest = <ServerBadRequestError>{
      status: 400,
      error: {
        errors: [
          {
            property: "non-existing-filed",
            message: "This field is required"
          },
          {
            message: "This field is required"
          }
        ]
      }
    }
    serverErrorService.catchBadRequest(badRequest);
    fixture.detectChanges();

    var errorsCount = fixture.debugElement.queryAll(By.css('li')).length;
    expect(errorsCount).toEqual(2);

    formMessagesCleanerService.clean();
    fixture.detectChanges();

    var errorsCount = fixture.debugElement.queryAll(By.css('li')).length;
    expect(errorsCount).toEqual(0);
  });
});

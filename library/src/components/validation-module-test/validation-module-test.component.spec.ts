import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationModuleTestComponent } from './validation-module-test.component';

describe('ValidationModuleTestComponent', () => {
  let component: ValidationModuleTestComponent;
  let fixture: ComponentFixture<ValidationModuleTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationModuleTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationModuleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

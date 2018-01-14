import { TestBed, inject } from '@angular/core/testing';

import { ValidatorsFactoryService } from './validators-factory.service';

describe('ValidatorsFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorsFactoryService]
    });
  });

  it('should be created', inject([ValidatorsFactoryService], (service: ValidatorsFactoryService) => {
    expect(service).toBeTruthy();
  }));
});

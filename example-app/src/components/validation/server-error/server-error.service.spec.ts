import { TestBed, inject } from '@angular/core/testing';

import { ServerErrorService } from './server-error.service';

describe('ServerErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerErrorService]
    });
  });

  it('should be created', inject([ServerErrorService], (service: ServerErrorService) => {
    expect(service).toBeTruthy();
  }));
});

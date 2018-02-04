import { TestBed, inject } from '@angular/core/testing';

import { ServerErrorReaderService } from './server-error-reader.service';

describe('ServerErrorReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerErrorReaderService]
    });
  });

  it('should be created', inject([ServerErrorReaderService], (service: ServerErrorReaderService) => {
    expect(service).toBeTruthy();
  }));
});

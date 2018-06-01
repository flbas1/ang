import { TestBed, inject } from '@angular/core/testing';

import { EntryPointService } from './entry-point.service';

describe('EntryPointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryPointService]
    });
  });

  it('should be created', inject([EntryPointService], (service: EntryPointService) => {
    expect(service).toBeTruthy();
  }));
});

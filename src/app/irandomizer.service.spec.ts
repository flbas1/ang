import { TestBed, inject } from '@angular/core/testing';

import { IRandomizerService } from './irandomizer.service';

describe('IRandomizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IRandomizerService]
    });
  });

  it('should be created', inject([IRandomizerService], (service: IRandomizerService) => {
    expect(service).toBeTruthy();
  }));
});

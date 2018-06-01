import { TestBed, inject } from '@angular/core/testing';

import { DefaultRandomizerService } from './default-randomizer.service';

describe('DefaultRandomizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultRandomizerService]
    });
  });

  it('should be created', inject([DefaultRandomizerService], (service: DefaultRandomizerService) => {
    expect(service).toBeTruthy();
  }));
});

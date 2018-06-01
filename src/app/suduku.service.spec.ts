import { TestBed, inject } from '@angular/core/testing';

import { SudukuService } from './suduku.service';

describe('SudukuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudukuService]
    });
  });

  it('should be created', inject([SudukuService], (service: SudukuService) => {
    expect(service).toBeTruthy();
  }));
});

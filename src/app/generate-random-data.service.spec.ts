import { TestBed, inject } from '@angular/core/testing';

import { GenerateRandomDataService } from './generate-random-data.service';

describe('GenerateRandomDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateRandomDataService]
    });
  });

  it('should be created', inject([GenerateRandomDataService], (service: GenerateRandomDataService) => {
    expect(service).toBeTruthy();
  }));
});

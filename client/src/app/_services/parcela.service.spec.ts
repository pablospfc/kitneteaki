import { TestBed } from '@angular/core/testing';

import { ParcelaService } from './parcela.service';

describe('ParcelaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParcelaService = TestBed.get(ParcelaService);
    expect(service).toBeTruthy();
  });
});

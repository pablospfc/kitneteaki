import { TestBed } from '@angular/core/testing';

import { CategoriaContaService } from './categoria-conta.service';

describe('CategoriaContaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriaContaService = TestBed.get(CategoriaContaService);
    expect(service).toBeTruthy();
  });
});

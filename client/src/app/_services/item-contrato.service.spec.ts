import { TestBed } from '@angular/core/testing';

import { ItemContratoService } from './item-contrato.service';

describe('ItemContratoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemContratoService = TestBed.get(ItemContratoService);
    expect(service).toBeTruthy();
  });
});

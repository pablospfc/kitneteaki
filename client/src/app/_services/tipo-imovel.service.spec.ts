import { TestBed } from '@angular/core/testing';

import { TipoImovelService } from './tipo-imovel.service';

describe('TipoImovelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoImovelService = TestBed.get(TipoImovelService);
    expect(service).toBeTruthy();
  });
});

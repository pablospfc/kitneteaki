import { TestBed } from '@angular/core/testing';

import { ModeloDocumentoService } from './modelo-documento.service';

describe('ModeloDocumentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeloDocumentoService = TestBed.get(ModeloDocumentoService);
    expect(service).toBeTruthy();
  });
});

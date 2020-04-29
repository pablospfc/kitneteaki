import { TestBed, async, inject } from '@angular/core/testing';

import { ModeloDocumentoGuard } from './modelo-documento.guard';

describe('ModeloDocumentoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeloDocumentoGuard]
    });
  });

  it('should ...', inject([ModeloDocumentoGuard], (guard: ModeloDocumentoGuard) => {
    expect(guard).toBeTruthy();
  }));
});

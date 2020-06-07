import { TestBed } from '@angular/core/testing';

import { FormaPagamentoService } from './forma-pagamento.service';

describe('FormaPagamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormaPagamentoService = TestBed.get(FormaPagamentoService);
    expect(service).toBeTruthy();
  });
});

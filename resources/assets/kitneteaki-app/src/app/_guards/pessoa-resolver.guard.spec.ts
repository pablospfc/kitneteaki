import { TestBed, async, inject } from '@angular/core/testing';

import { PessoaResolverGuard } from './pessoa-resolver.guard';

describe('PessoaResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PessoaResolverGuard]
    });
  });

  it('should ...', inject([PessoaResolverGuard], (guard: PessoaResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});

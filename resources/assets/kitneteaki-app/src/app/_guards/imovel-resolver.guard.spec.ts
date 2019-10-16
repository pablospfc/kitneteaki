import { TestBed, async, inject } from '@angular/core/testing';

import { ImovelResolverGuard } from './imovel-resolver.guard';

describe('ImovelResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImovelResolverGuard]
    });
  });

  it('should ...', inject([ImovelResolverGuard], (guard: ImovelResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});

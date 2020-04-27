import { TestBed, async, inject } from '@angular/core/testing';

import { ContaResolverGuard } from './conta-resolver.guard';

describe('ContaResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContaResolverGuard]
    });
  });

  it('should ...', inject([ContaResolverGuard], (guard: ContaResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});

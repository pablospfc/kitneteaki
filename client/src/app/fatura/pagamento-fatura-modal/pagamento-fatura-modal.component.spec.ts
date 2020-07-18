import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoFaturaModalComponent } from './pagamento-fatura-modal.component';

describe('PagamentoFaturaModalComponent', () => {
  let component: PagamentoFaturaModalComponent;
  let fixture: ComponentFixture<PagamentoFaturaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoFaturaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoFaturaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormaPagamentoComponent } from './list-forma-pagamento.component';

describe('ListFormaPagamentoComponent', () => {
  let component: ListFormaPagamentoComponent;
  let fixture: ComponentFixture<ListFormaPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFormaPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

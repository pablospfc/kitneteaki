import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormaPagamentoModalComponent } from './new-forma-pagamento-modal.component';

describe('NewFormaPagamentoModalComponent', () => {
  let component: NewFormaPagamentoModalComponent;
  let fixture: ComponentFixture<NewFormaPagamentoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFormaPagamentoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFormaPagamentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

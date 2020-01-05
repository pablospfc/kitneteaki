import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizacaoContratoComponent } from './finalizacao-contrato.component';

describe('FinalizacaoContratoComponent', () => {
  let component: FinalizacaoContratoComponent;
  let fixture: ComponentFixture<FinalizacaoContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizacaoContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizacaoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

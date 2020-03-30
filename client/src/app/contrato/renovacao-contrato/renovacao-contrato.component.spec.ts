import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovacaoContratoComponent } from './renovacao-contrato.component';

describe('RenovacaoContratoComponent', () => {
  let component: RenovacaoContratoComponent;
  let fixture: ComponentFixture<RenovacaoContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenovacaoContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenovacaoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

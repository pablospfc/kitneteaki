import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensContratoModalComponent } from './itens-contrato-modal.component';

describe('ItensContratoModalComponent', () => {
  let component: ItensContratoModalComponent;
  let fixture: ComponentFixture<ItensContratoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensContratoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensContratoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

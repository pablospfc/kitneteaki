import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelasContratoModalComponent } from './parcelas-contrato-modal.component';

describe('ParcelasContratoModalComponent', () => {
  let component: ParcelasContratoModalComponent;
  let fixture: ComponentFixture<ParcelasContratoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelasContratoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelasContratoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

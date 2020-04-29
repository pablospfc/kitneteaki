import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoContratoModalComponent } from './documento-contrato-modal.component';

describe('DocumentoContratoModalComponent', () => {
  let component: DocumentoContratoModalComponent;
  let fixture: ComponentFixture<DocumentoContratoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoContratoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoContratoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

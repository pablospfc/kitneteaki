import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupantesImovelModalComponent } from './ocupantes-imovel-modal.component';

describe('OcupantesImovelModalComponent', () => {
  let component: OcupantesImovelModalComponent;
  let fixture: ComponentFixture<OcupantesImovelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcupantesImovelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupantesImovelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

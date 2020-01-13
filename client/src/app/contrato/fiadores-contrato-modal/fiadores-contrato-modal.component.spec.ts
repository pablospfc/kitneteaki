import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiadoresContratoModalComponent } from './fiadores-contrato-modal.component';

describe('FiadoresContratoModalComponent', () => {
  let component: FiadoresContratoModalComponent;
  let fixture: ComponentFixture<FiadoresContratoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiadoresContratoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiadoresContratoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

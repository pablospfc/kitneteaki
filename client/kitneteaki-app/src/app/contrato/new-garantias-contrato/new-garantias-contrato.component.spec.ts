import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGarantiasContratoComponent } from './new-garantias-contrato.component';

describe('NewGarantiasContratoComponent', () => {
  let component: NewGarantiasContratoComponent;
  let fixture: ComponentFixture<NewGarantiasContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGarantiasContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGarantiasContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

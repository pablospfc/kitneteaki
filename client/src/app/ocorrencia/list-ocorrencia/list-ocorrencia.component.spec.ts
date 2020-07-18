import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOcorrenciaComponent } from './list-ocorrencia.component';

describe('ListOcorrenciaComponent', () => {
  let component: ListOcorrenciaComponent;
  let fixture: ComponentFixture<ListOcorrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOcorrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

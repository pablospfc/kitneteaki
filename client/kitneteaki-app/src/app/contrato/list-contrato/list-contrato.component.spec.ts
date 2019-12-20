import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContratoComponent } from './list-contrato.component';

describe('ListContratoComponent', () => {
  let component: ListContratoComponent;
  let fixture: ComponentFixture<ListContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

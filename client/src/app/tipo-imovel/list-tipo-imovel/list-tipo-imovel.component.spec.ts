import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoImovelComponent } from './list-tipo-imovel.component';

describe('ListTipoImovelComponent', () => {
  let component: ListTipoImovelComponent;
  let fixture: ComponentFixture<ListTipoImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

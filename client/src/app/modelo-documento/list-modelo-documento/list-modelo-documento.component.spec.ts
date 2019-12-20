import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeloDocumentoComponent } from './list-modelo-documento.component';

describe('ListModeloDocumentoComponent', () => {
  let component: ListModeloDocumentoComponent;
  let fixture: ComponentFixture<ListModeloDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListModeloDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModeloDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

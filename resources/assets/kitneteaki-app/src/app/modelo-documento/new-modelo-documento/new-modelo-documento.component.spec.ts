import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModeloDocumentoComponent } from './new-modelo-documento.component';

describe('NewModeloDocumentoComponent', () => {
  let component: NewModeloDocumentoComponent;
  let fixture: ComponentFixture<NewModeloDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewModeloDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewModeloDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

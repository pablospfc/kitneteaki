import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTipoImovelModalComponent } from './new-tipo-imovel-modal.component';

describe('NewTipoImovelModalComponent', () => {
  let component: NewTipoImovelModalComponent;
  let fixture: ComponentFixture<NewTipoImovelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTipoImovelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTipoImovelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

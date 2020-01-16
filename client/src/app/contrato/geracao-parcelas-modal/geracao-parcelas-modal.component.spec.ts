import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeracaoParcelasModalComponent } from './geracao-parcelas-modal.component';

describe('GeracaoParcelasModalComponent', () => {
  let component: GeracaoParcelasModalComponent;
  let fixture: ComponentFixture<GeracaoParcelasModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeracaoParcelasModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeracaoParcelasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

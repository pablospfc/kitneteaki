import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletoTemplateComponent } from './boleto-template.component';

describe('BoletoTemplateComponent', () => {
  let component: BoletoTemplateComponent;
  let fixture: ComponentFixture<BoletoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

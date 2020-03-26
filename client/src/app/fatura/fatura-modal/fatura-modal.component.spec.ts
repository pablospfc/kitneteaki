import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturaModalComponent } from './fatura-modal.component';

describe('FaturaModalComponent', () => {
  let component: FaturaModalComponent;
  let fixture: ComponentFixture<FaturaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaturaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

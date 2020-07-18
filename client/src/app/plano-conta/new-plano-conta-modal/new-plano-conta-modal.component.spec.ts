import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlanoContaModalComponent } from './new-plano-conta-modal.component';

describe('NewPlanoContaModalComponent', () => {
  let component: NewPlanoContaModalComponent;
  let fixture: ComponentFixture<NewPlanoContaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlanoContaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlanoContaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsuarioModalComponent } from './update-usuario-modal.component';

describe('UpdateUsuarioModalComponent', () => {
  let component: UpdateUsuarioModalComponent;
  let fixture: ComponentFixture<UpdateUsuarioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUsuarioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

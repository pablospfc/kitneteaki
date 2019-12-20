import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPessoaComponent } from './new-pessoa.component';

describe('NewPessoaComponent', () => {
  let component: NewPessoaComponent;
  let fixture: ComponentFixture<NewPessoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPessoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

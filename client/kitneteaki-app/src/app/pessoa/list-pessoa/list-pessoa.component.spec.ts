import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPessoaComponent } from './list-pessoa.component';

describe('ListPessoaComponent', () => {
  let component: ListPessoaComponent;
  let fixture: ComponentFixture<ListPessoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPessoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

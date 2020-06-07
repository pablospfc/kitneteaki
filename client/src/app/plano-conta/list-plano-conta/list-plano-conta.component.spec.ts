import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanoContaComponent } from './list-plano-conta.component';

describe('ListPlanoContaComponent', () => {
  let component: ListPlanoContaComponent;
  let fixture: ComponentFixture<ListPlanoContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlanoContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

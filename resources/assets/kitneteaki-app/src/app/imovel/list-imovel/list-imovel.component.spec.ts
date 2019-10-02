import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImovelComponent } from './list-imovel.component';

describe('ListImovelComponent', () => {
  let component: ListImovelComponent;
  let fixture: ComponentFixture<ListImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

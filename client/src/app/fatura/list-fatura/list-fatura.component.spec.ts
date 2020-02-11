import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFaturaComponent } from './list-fatura.component';

describe('ListFaturaComponent', () => {
  let component: ListFaturaComponent;
  let fixture: ComponentFixture<ListFaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewImovelComponent } from './new-imovel.component';

describe('NewImovelComponent', () => {
  let component: NewImovelComponent;
  let fixture: ComponentFixture<NewImovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewImovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

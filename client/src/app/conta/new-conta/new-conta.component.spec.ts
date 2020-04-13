import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContaComponent } from './new-conta.component';

describe('NewContaComponent', () => {
  let component: NewContaComponent;
  let fixture: ComponentFixture<NewContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

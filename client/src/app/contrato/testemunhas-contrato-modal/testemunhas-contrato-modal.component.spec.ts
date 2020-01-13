import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestemunhasContratoModalComponent } from './testemunhas-contrato-modal.component';

describe('TestemunhasContratoModalComponent', () => {
  let component: TestemunhasContratoModalComponent;
  let fixture: ComponentFixture<TestemunhasContratoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestemunhasContratoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestemunhasContratoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

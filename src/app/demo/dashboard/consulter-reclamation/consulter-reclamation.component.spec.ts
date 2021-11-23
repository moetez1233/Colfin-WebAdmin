import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterReclamationComponent } from './consulter-reclamation.component';

describe('ConsulterReclamationComponent', () => {
  let component: ConsulterReclamationComponent;
  let fixture: ComponentFixture<ConsulterReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterReclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDemandesComponent } from './consulter-demandes.component';

describe('ConsulterDemandesComponent', () => {
  let component: ConsulterDemandesComponent;
  let fixture: ComponentFixture<ConsulterDemandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterDemandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterUsersComponent } from './consulter-users.component';

describe('ConsulterUsersComponent', () => {
  let component: ConsulterUsersComponent;
  let fixture: ComponentFixture<ConsulterUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

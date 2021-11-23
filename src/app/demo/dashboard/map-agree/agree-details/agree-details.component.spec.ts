import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreeDetailsComponent } from './agree-details.component';

describe('AgreeDetailsComponent', () => {
  let component: AgreeDetailsComponent;
  let fixture: ComponentFixture<AgreeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

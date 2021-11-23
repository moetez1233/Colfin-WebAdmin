import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAgreeComponent } from './mapAgree.component';

describe('MapAgreeComponent', () => {
  let component: MapAgreeComponent;
  let fixture: ComponentFixture<MapAgreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAgreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAgreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

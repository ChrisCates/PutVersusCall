import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadRouteComponent } from './spread-route.component';

describe('SpreadRouteComponent', () => {
  let component: SpreadRouteComponent;
  let fixture: ComponentFixture<SpreadRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

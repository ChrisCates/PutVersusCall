import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerRouteComponent } from './ticker-route.component';

describe('TickerRouteComponent', () => {
  let component: TickerRouteComponent;
  let fixture: ComponentFixture<TickerRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

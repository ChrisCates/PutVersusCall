import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerSpreadRecentComponent } from './ticker-spread-recent.component';

describe('TickerSpreadRecentComponent', () => {
  let component: TickerSpreadRecentComponent;
  let fixture: ComponentFixture<TickerSpreadRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerSpreadRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerSpreadRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

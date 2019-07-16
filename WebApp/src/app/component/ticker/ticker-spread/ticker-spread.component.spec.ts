import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerSpreadComponent } from './ticker-spread.component';

describe('TickerSpreadComponent', () => {
  let component: TickerSpreadComponent;
  let fixture: ComponentFixture<TickerSpreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerSpreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerSpreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

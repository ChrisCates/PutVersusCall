import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerStrikesComponent } from './ticker-strikes.component';

describe('TickerStrikesComponent', () => {
  let component: TickerStrikesComponent;
  let fixture: ComponentFixture<TickerStrikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerStrikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerStrikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerOptionsComponent } from './ticker-options.component';

describe('TickerOptionsComponent', () => {
  let component: TickerOptionsComponent;
  let fixture: ComponentFixture<TickerOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

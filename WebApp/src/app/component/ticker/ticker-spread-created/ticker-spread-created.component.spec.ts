import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerSpreadCreatedComponent } from './ticker-spread-created.component';

describe('TickerSpreadCreatedComponent', () => {
  let component: TickerSpreadCreatedComponent;
  let fixture: ComponentFixture<TickerSpreadCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerSpreadCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerSpreadCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

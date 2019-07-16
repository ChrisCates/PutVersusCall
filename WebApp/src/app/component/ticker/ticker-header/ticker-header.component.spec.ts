import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerHeaderComponent } from './ticker-header.component';

describe('TickerHeaderComponent', () => {
  let component: TickerHeaderComponent;
  let fixture: ComponentFixture<TickerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerSpreadPublishComponent } from './ticker-spread-publish.component';

describe('TickerSpreadPublishComponent', () => {
  let component: TickerSpreadPublishComponent;
  let fixture: ComponentFixture<TickerSpreadPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerSpreadPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerSpreadPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

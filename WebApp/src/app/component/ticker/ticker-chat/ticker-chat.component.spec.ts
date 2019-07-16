import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerChatComponent } from './ticker-chat.component';

describe('TickerChatComponent', () => {
  let component: TickerChatComponent;
  let fixture: ComponentFixture<TickerChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

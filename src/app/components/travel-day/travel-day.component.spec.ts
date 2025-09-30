import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDayComponent } from './travel-day.component';

describe('TravelDayComponent', () => {
  let component: TravelDayComponent;
  let fixture: ComponentFixture<TravelDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

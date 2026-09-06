import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikePlanPageComponent } from './hike-plan-page.component';

describe('HikePlanPageComponent', () => {
  let component: HikePlanPageComponent;
  let fixture: ComponentFixture<HikePlanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikePlanPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HikePlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

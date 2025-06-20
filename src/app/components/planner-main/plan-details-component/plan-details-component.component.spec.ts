import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetailsComponentComponent } from './plan-details-component.component';

describe('PlanDetailsComponentComponent', () => {
  let component: PlanDetailsComponentComponent;
  let fixture: ComponentFixture<PlanDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDetailsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

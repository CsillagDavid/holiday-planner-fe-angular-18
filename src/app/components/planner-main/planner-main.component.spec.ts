import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerMainComponent } from './planner-main.component';

describe('PlannerMainComponent', () => {
  let component: PlannerMainComponent;
  let fixture: ComponentFixture<PlannerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

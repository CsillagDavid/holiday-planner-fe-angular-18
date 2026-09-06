import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedHikeComponent } from './shared-hike.component';

describe('SharedHikeComponent', () => {
  let component: SharedHikeComponent;
  let fixture: ComponentFixture<SharedHikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedHikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedHikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

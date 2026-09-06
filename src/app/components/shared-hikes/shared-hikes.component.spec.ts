import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedHikesComponent } from './shared-hikes.component';

describe('SharedHikesComponent', () => {
  let component: SharedHikesComponent;
  let fixture: ComponentFixture<SharedHikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedHikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedHikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

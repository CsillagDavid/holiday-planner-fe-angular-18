import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSharedHikeComponent } from './edit-shared-hike.component';

describe('EditSharedHikeComponent', () => {
  let component: EditSharedHikeComponent;
  let fixture: ComponentFixture<EditSharedHikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSharedHikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSharedHikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

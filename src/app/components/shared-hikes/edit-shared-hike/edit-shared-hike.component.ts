import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-shared-hike',
  imports: [],
  templateUrl: './edit-shared-hike.component.html',
  styleUrl: './edit-shared-hike.component.scss',
})
export class EditSharedHikeComponent {
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      const hikeId = params['id'];
      console.log('Editing shared hike with ID:', hikeId);
    });
  }
}

import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-plan-layout',
  imports: [MapComponent, RouterOutlet],
  templateUrl: './plan-layout.component.html',
  styleUrl: './plan-layout.component.scss'
})
export class PlanLayoutComponent {

}

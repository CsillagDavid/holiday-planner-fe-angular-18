import { Component } from '@angular/core';
import { PlannerMainComponent } from "../../components/planner-main/planner-main.component";
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: 'app-home',
  imports: [PlannerMainComponent, MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

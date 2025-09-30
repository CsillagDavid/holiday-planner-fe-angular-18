import { Component, Input } from '@angular/core';
import { TravelDay } from '../../api/models/travel-day.model';
import { DestinationComponent } from "../destination/destination.component";
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-travel-day',
  imports: [DestinationComponent, MatExpansionModule, MatIconModule, MatButtonModule],
  templateUrl: './travel-day.component.html',
  styleUrl: './travel-day.component.scss'
})
export class TravelDayComponent {
  @Input() travelDay: TravelDay | undefined;

}

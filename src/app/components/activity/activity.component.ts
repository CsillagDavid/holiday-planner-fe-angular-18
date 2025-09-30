import { Component, Input } from '@angular/core';
import { Activity } from '../../api/models/activity.model';
import { CostComponent } from "../cost/cost.component";
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-activity',
  imports: [CostComponent, MatExpansionModule, MatIconModule, MatButtonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  @Input() activity: Activity | undefined;
}

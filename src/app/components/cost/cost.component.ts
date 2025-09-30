import { Component, Input } from '@angular/core';
import { Cost } from '../../api/models/cost.model';

@Component({
  selector: 'app-cost',
  imports: [],
  templateUrl: './cost.component.html',
  styleUrl: './cost.component.scss'
})
export class CostComponent {
  @Input() cost: Cost | undefined;
}

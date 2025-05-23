import { Component } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { TravelDay } from '../../api/models/travel-day.model';
import { Plan } from '../../api/models/plan.model';

@Component({
    selector: 'app-planner-main',
    imports: [],
    templateUrl: './planner-main.component.html',
    styleUrl: './planner-main.component.scss'
})
export class PlannerMainComponent {
    response = '';
    plan!: Plan;
    constructor(private planService: PlanService) {
        planService.getPlan(1).subscribe(response => {
            this.plan = response;
        });
    }
}

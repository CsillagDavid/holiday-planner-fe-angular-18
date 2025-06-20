import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plan } from '../../../api/models/plan.model';
import { PlanService } from '../../../services/plan.service';

@Component({
    selector: 'app-plan-details-component',
    imports: [],
    templateUrl: './plan-details-component.component.html',
    styleUrl: './plan-details-component.component.scss'
})
export class PlanDetailsComponent {
    plan!: Plan;
    constructor(private route: ActivatedRoute,
        private planService: PlanService
    ) {
        const planId = +this.route.snapshot.paramMap.get('planId')!;
        if(planId) {
            this.planService.getPlan(planId).subscribe(response => {
                this.plan = response;
            });
        } else {
            alert("Can't find planId");
        }
    }
}

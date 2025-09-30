import { Component, signal } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Plan } from '../../api/models/plan.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlanCardComponent } from "./plan-card/plan-card.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-planner-main',
    imports: [MatExpansionModule, PlanCardComponent, MatIconModule, MatButtonModule],
    templateUrl: './planner-main.component.html',
    styleUrl: './planner-main.component.scss'
})
export class PlannerMainComponent {
    readonly panelOpenState = signal(false);

    plans: Plan[] = [];

    constructor(private planService: PlanService) {
        planService.getPlans().subscribe(response => {
            this.plans = response;
        });
    }
}

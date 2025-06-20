import { Component, Input } from '@angular/core';
import { Plan } from '../../../api/models/plan.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-plan-card',
    imports: [],
    templateUrl: './plan-card.component.html',
    styleUrl: './plan-card.component.scss'
})
export class PlanCardComponent {
    @Input() plan!: Plan;

    constructor(private router: Router){}

    navigate() {
        this.router.navigate([`plans/${this.plan.id}`]);
    }
}
import { Component, Input } from '@angular/core';
import { Plan } from '../../../api/models/plan.model';
import { Router } from '@angular/router';
import { ApiRoutes } from '../../../api/api-routes';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-plan-card',
    imports: [DatePipe],
    templateUrl: './plan-card.component.html',
    styleUrl: './plan-card.component.scss'
})
export class PlanCardComponent {
    @Input() plan!: Plan;

    constructor(private router: Router) { }

    navigate() {
        this.router.navigate([`plans/${this.plan.id}`]);
    }

    getImageUrl() {
        return this.plan.indexPictureId ? ApiRoutes.attachment.getImage(this.plan.indexPictureId) : '';
    }
}
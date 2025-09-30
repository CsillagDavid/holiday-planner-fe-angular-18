import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plan } from '../../../api/models/plan.model';
import { PlanService } from '../../../services/plan.service';
import { TravelDayComponent } from "../../travel-day/travel-day.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrudState } from '../../../api/enums/crud-state.enum';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TravelDayService } from '../../../services/travel-day.service';
import { TravelDay } from '../../../api/models/travel-day.model';

@Component({
    selector: 'app-plan-details-component',
    imports: [TravelDayComponent, MatIconModule, MatButtonModule, FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule],
    templateUrl: './plan-details-component.component.html',
    styleUrl: './plan-details-component.component.scss'
})
export class PlanDetailsComponent {
    plan!: Plan;
    addTravelDayFormGroup!: FormGroup;
    crudState = CrudState.READ;
    planId: number;

    get showAddForm() {
        return this.crudState === CrudState.CREATE;
    }

    constructor(private route: ActivatedRoute,
        private planService: PlanService,
        private travelDayService: TravelDayService
    ) {
        this.planId = +this.route.snapshot.paramMap.get('planId')!;
        if (this.planId) {
            this.planService.getPlan(this.planId).subscribe(response => {
                this.plan = response;
            });
        } else {
            alert("Can't find planId");
        }
        this.initFormGroup();
    }

    initFormGroup() {
        this.addTravelDayFormGroup = new FormGroup({
            travelDayName: new FormControl('', [Validators.required])
        });
    }

    onAddTravelDay() {
        this.crudState = CrudState.CREATE;
    }

    onSave() {
        const travelDay = {
            name: this.addTravelDayFormGroup.controls['travelDayName'].getRawValue()
        } as TravelDay;

        this.planService.upsertTravelDay(this.planId, travelDay)
            .subscribe({
                next: () => {
                    this.crudState = CrudState.READ;
                    this.planService.getPlan(this.planId).subscribe(response => {
                        this.plan = response;
                    });
                }
            });
    }
}

import { Component, inject, signal } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Plan } from '../../api/models/plan.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddPlanComponent, PlanCardData } from "./add-plan/add-plan.component";
import { CrudState } from '../../api/enums/crud-state.enum';
import { AttachmentService } from '../../services/attachment.service';
import { ErrorModalComponent, ErrorInputData } from '../modals/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-planner-main',
    imports: [MatExpansionModule, MatIconModule, MatButtonModule, AddPlanComponent],
    templateUrl: './planner-main.component.html',
    styleUrl: './planner-main.component.scss'
})
export class PlannerMainComponent {
    readonly crudState = signal<CrudState>(CrudState.READ);
    readonly selectedPlanId = signal<number | undefined>(undefined);
    readonly dialog = inject(MatDialog);

    plans = signal<Plan[]>([]);

    constructor(private planService: PlanService,
        private attachmentService: AttachmentService) {
        planService.getPlans().subscribe(response => {
            this.plans.set(response);
        });
    }

    getCreateCrudState(): CrudState {
        return CrudState.CREATE;
    }

    onAddPlan() {
        this.crudState.set(CrudState.CREATE);
        this.selectedPlanId.set(undefined);
    }

    onCreate(plan: Plan) {
        // this.manageImageUploadLogic(() => this.createPlan());
        // this.plans.update(plans => [...plans, plan]);
        // this.isInCreateState.set(false);
    }

    onCancel() {
        this.setStatesDefault();
    }

    onDelete(plan: Plan) {
        this.openErrorModal('Do you want to delete?', () => this.deletePlan(plan.id));
    }

    onSave(planCardData: PlanCardData) {
        // var callback: Function;
        // switch (this.crudState()) {
        //     case (CrudState.CREATE): {
        //         callback = () => this.createPlan(planCardData);
        //         break;
        //     }
        //     case (CrudState.UPDATE): {
        //         callback = () => this.updatePlan(planCardData);
        //         break;
        //     }
        // }

        const imageFile = planCardData.imageFile;
        // this.isFetching.set(true);
        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);
            this.attachmentService.uploadImage(formData).subscribe({
                next: (res: number) => {
                    switch (this.crudState()) {
                        case (CrudState.CREATE): {
                            this.createPlan(planCardData);
                            break;
                        }
                        case (CrudState.UPDATE): {
                            this.updatePlan(planCardData);
                            break;
                        }
                    };
                },
                error: (err) => {
                    console.log(err);
                    // this.isFetching.set(false);
                }
            });
        } else {
            switch (this.crudState()) {
                case (CrudState.CREATE): {
                    this.createPlan(planCardData);
                    break;
                }
                case (CrudState.UPDATE): {
                    this.updatePlan(planCardData);
                    break;
                }
            };
        }
    }

    isComponentDisabled(planId: number) {
        return this.crudState() !== CrudState.READ && this.selectedPlanId() ? this.selectedPlanId() !== planId : false;
    }

    selectPlan(planId: any) {
        this.crudState.set(CrudState.UPDATE);
        this.selectedPlanId.set(planId);
        console.log(this.crudState());
    }

    isInCreateState(): boolean {
        return this.crudState() === CrudState.CREATE;
    }

    private setStatesDefault() {
        this.crudState.set(CrudState.READ);
        this.selectedPlanId.set(undefined);
        console.log(this.crudState());
    }

    private updatePlan(plan: Plan) {
        console.log("updatePlan");
        this.planService.updatePlan(plan).subscribe({
            next: (res: Plan) => {
                var existingPlan = this.plans().find(plan => plan.id === res.id);
                console.log(existingPlan);
                if (existingPlan) {
                    existingPlan = plan;
                }
                this.setStatesDefault();
                // this.isFetching.set(false);
                // this.update.emit(value);
            },
            error: (error: any) => {
                // this.isFetching.set(false);
                console.log(error);
                alert("Error");
            }
        });
    }

    private createPlan(plan: Plan) {

        this.planService.addPlan(plan).subscribe({
            next: (res: Plan) => {
                this.plans().push(res);
                this.setStatesDefault()
                // this.isFetching.set(false);
                // this.create.emit(value);
            },
            error: (error) => {
                // this.isFetching.set(false);
                console.log(error);
                alert("Error");
            }
        });
    }

    private deletePlan(planId: number) {
        this.planService.deletePlan(planId).subscribe({
            next: () => {
                const deletablePlanIndex = this.plans().findIndex(plan => plan.id === planId);
                this.plans.update(() => [...this.plans().slice(0, deletablePlanIndex), ...this.plans().slice(deletablePlanIndex +1)]);
                this.setStatesDefault();
            },
            error: (error) => {
                console.log(error);
                this.openErrorModal(error.message);
            }
        });
    }

    private openErrorModal(errorMessage: string, onNext?: Function): void {
        this.dialog.open(ErrorModalComponent, {
            data: {
                header: 'Error',
                content: errorMessage,
                onNext: onNext
            } as ErrorInputData,
        });
    }
}
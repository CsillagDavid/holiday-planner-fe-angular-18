import { Component, effect, EffectRef, inject, OnDestroy, signal } from '@angular/core';
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
import { CrudStateService } from '../../services/crud-state.service';
import { Subscription } from 'rxjs';
import { ActionState } from '../../api/enums/action-state.enum';
import { LoaderComponent } from "../loader/loader.component";

@Component({
    selector: 'app-planner-main',
    imports: [MatExpansionModule, MatIconModule, MatButtonModule, AddPlanComponent, LoaderComponent],
    templateUrl: './planner-main.component.html',
    styleUrl: './planner-main.component.scss'
})
export class PlannerMainComponent implements OnDestroy {
    public CRUD_STATE = CrudState;

    readonly crudState = signal<CrudState>(CrudState.READ);
    readonly actionState = signal<ActionState>(ActionState.Pending);
    readonly selectedPlanId = signal<number | undefined>(undefined);
    readonly dialog = inject(MatDialog);
    readonly isFetching = signal<boolean>(false);

    private crudState$!: Subscription;

    plans = signal<Plan[]>([]);

    constructor(private planService: PlanService,
        private attachmentService: AttachmentService,
        private crudStateService: CrudStateService) {
        crudStateService.initializeValues();

        this.crudState$ = crudStateService
            .getCrudState()
            .subscribe(next => {
                this.crudState.set(next);
            });

        this.fetchStarted();
        planService.getPlans().subscribe(response => {
            this.plans.set(response);
            this.fetchCompleted();
        });

        // this.actionStateEffect = effect(() => {
        //     this.actionState()
        // }, {debugName: 'actionStateEffect'})
    }

    getCreateCrudState(): CrudState {
        return CrudState.CREATE;
    }

    onAddPlan() {
        this.crudStateService.setState(CrudState.CREATE);
    }

    onCancel() {
        this.setStatesDefault();
    }

    onDelete(plan: Plan) {
        this.crudStateService.setState(CrudState.DELETE);
        this.openErrorModal('Do you want to delete?', () => this.deletePlan(plan.id));
    }

    onSave(planCardData: PlanCardData) {
        let callback: () => void;

        switch (this.crudState()) {
            case CrudState.CREATE:
                callback = () => this.createPlan(planCardData);
                break;

            case CrudState.UPDATE:
                callback = () => this.updatePlan(planCardData);
                break;
            default: {
                alert("planner-main.component.ts - onSave");
                return;
            }
        }

        const imageFile = planCardData.imageFile;

        this.fetchStarted();

        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);
            this.attachmentService.uploadImage(formData).subscribe({
                next: (attachmentId: number) => {
                    planCardData.indexPictureId = attachmentId;
                    this.fetchCompleted();
                    callback.call(planCardData);
                },
                error: (error) => {
                    this.fetchCompleted();
                    this.openErrorModal(error.message);
                }
            });
        } else {
            callback();
        }
    }

    isComponentDisabled(planId: number) {
        return this.crudState() === CrudState.CREATE
            || this.crudState() !== CrudState.READ && this.selectedPlanId() ? this.selectedPlanId() !== planId : false;
    }

    selectPlan(planId: any) {
        this.crudStateService.setState(CrudState.UPDATE);
        this.selectedPlanId.set(planId);
        console.log(this.crudState());
    }

    isInCreateState(): boolean {
        return this.crudState() === CrudState.CREATE;
    }

    private fetchStarted() {
        this.isFetching.set(true);
    }

    private fetchCompleted() {
        this.isFetching.set(false);
    }

    private setStatesDefault() {
        this.crudStateService.setState(CrudState.READ);
        this.selectedPlanId.set(undefined);
    }

    private updatePlan(plan: Plan) {
        this.fetchStarted();
        this.planService.updatePlan(plan).subscribe({
            next: (updated: Plan) => {
                var indx = this.plans().findIndex(plan => plan.id === updated.id);
                if (indx >= 0) {
                    this.plans.update(list =>
                        list.map(p => p.id === updated.id ? updated : p)
                    );
                }
                this.fetchCompleted();
                this.setStatesDefault();
            },
            error: (error: any) => {
                this.fetchCompleted();
                this.openErrorModal(error.message);
            }
        });
    }

    private createPlan(plan: Plan) {
        this.fetchStarted();
        this.planService.addPlan(plan).subscribe({
            next: (res: Plan) => {
                this.fetchCompleted();
                this.plans().push(res);
                this.setStatesDefault();
            },
            error: (error) => {
                this.fetchCompleted();
                this.openErrorModal(error.message);
            }
        });
    }

    private deletePlan(planId: number) {
        this.fetchStarted();
        this.planService.deletePlan(planId).subscribe({
            next: () => {
                const deletablePlanIndex = this.plans().findIndex(plan => plan.id === planId);
                this.plans.update(() => [...this.plans().slice(0, deletablePlanIndex), ...this.plans().slice(deletablePlanIndex + 1)]);
                this.fetchCompleted();
                this.setStatesDefault();
            },
            error: (error) => {
                this.fetchCompleted();
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

    ngOnDestroy(): void {
        this.crudState$?.unsubscribe();
    }
}
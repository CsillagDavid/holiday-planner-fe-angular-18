import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Plan } from '../../../api/models/plan.model';
import { MatDatepickerModule, MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInput } from '@angular/material/input';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatCardSubtitle } from "@angular/material/card";
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ApiRoutes } from '../../../api/api-routes';
import { CrudState } from '../../../api/enums/crud-state.enum';
import { DatePipe, NgStyle, NgClass } from '@angular/common';
import * as imageUtil from '../../../api/utils/image.util';

export interface PlanCardData extends Plan {
    imageFile?: File;
}

@Component({
    selector: 'app-add-plan-component',
    imports: [MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatInput,
        MatRippleModule,
        MatIcon,
        MatDateRangeInput,
        MatDateRangePicker,
        MatDatepickerModule,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatMenu,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCardContent,
        MatCardActions,
        MatCardSubtitle,
        DatePipe,
        NgStyle,
        NgClass],
    providers: [provideNativeDateAdapter()],
    templateUrl: './add-plan.component.html',
    styleUrl: './add-plan.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddPlanComponent implements OnInit {
    @Input() planCardData = {} as PlanCardData;
    @Input() disabled = false;
    @Input({ required: true }) crudState = CrudState.READ;
    @Input() isSelected = false;

    @Output() save = new EventEmitter<PlanCardData>();
    @Output() delete = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() selectedForEdit = new EventEmitter();


    formGroup!: FormGroup;
    previewImage = signal<string | undefined>(undefined);

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.formGroup = new FormGroup({
            name: new FormControl<string>(this.planCardData?.name ?? '', Validators.required),
            description: new FormControl<string>(this.planCardData?.description ?? ''),
            travelFrom: new FormControl<Date | null>(this.planCardData?.travelFrom),
            travelTo: new FormControl<Date | null>(this.planCardData?.travelTo),
        })
    }

    isInEditMode() {
        return this.isSelected && this.crudState === CrudState.UPDATE;
    }

    isInReadMode() {
        return !this.isSelected;
    }

    onUploadImage($event: any) {
        const file: File = $event.target.files[0];
        if (file) {
            this.planCardData.imageFile = file;
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const imageUrl = e.target?.result as string;
                this.previewImage.set(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    }

    onEdit() {
        this.initForm();
        this.isSelected = true;
        this.selectedForEdit.emit();
    }

    onSave() {
        this.save.emit(this.getPlanCardData());
    }

    onCancel() {
        this.cancel.emit();
    }

    onDelete() {
        this.delete.emit();
    }

    isCreateUpdateButtonDisabled(): boolean {
        return !this.formGroup.valid || !this.isFormUpdated();
    }


    navigate() {
        this.router.navigate([`plans/${this.planCardData.id}`]);
    }

    hasImage() {
        return !!this.planCardData?.indexPictureId;
    }

    getImageUrl() {
        return this.previewImage() ?? imageUtil.getImageUrl(this.planCardData?.indexPictureId);
    }

    isFormUpdated(): boolean {
        return this.formGroup.controls['name'].value !== this.planCardData?.name
            || this.formGroup.controls['description'].value !== (this.planCardData?.description ?? '')
            || this.formGroup.controls['travelFrom'].value !== this.planCardData?.travelFrom
            || this.formGroup.controls['travelTo'].value !== this.planCardData?.travelTo
            || this.previewImage() !== undefined

    }

    private getPlanCardData(): PlanCardData {
        return {
            id: this.planCardData.id,
            name: this.formGroup.controls['name'].value,
            description: this.formGroup.controls['description'].value,
            travelFrom: this.formGroup.controls['travelFrom'].value,
            travelTo: this.formGroup.controls['travelTo'].value,
            indexPictureId: this.planCardData.indexPictureId,
            imageFile: this.planCardData.imageFile
        } as PlanCardData;
    }
}

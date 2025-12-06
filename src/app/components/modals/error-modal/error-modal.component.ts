import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ErrorInputData {
    header?: string;
    content?: string;
    onNext?: () => void;
    onCancel?: () => void;
}

@Component({
    selector: 'app-error-modal',
    imports: [MatDialogModule],
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent implements OnInit {
    readonly dialogRef = inject(MatDialogRef<ErrorModalComponent>);
    readonly data = inject<ErrorInputData>(MAT_DIALOG_DATA);

    ngOnInit(): void {

    }

    onNext(): void {
        this.data.onNext?.();
        this.dialogRef.close();
    }

    onClose(): void {
        this.data.onCancel?.();
        this.dialogRef.close();
    }
}
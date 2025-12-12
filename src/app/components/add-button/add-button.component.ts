import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-add-button',
    imports: [MatIcon],
    templateUrl: './add-button.component.html',
    styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
    @Output() click = new EventEmitter<void>();

    onClick() {
        this.click.emit();
    }
}

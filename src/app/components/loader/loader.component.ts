import { Component, ContentChild, Directive, Input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-loader',
    imports: [MatProgressSpinnerModule],
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss',
})
export class LoaderComponent {
    @Input({ required: true }) isLoading = signal<boolean>(false);
}

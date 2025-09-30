import { Component, Input, OnInit } from '@angular/core';
import { Destination } from '../../api/models/destination.model';
import { ActivityComponent } from "../activity/activity.component";
import { MatIconModule } from '@angular/material/icon';
import { DestinationType } from '../../api/enums/destination-type.enum';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { swapSortOrder } from '../../api/utils/array.utility';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../api/models/activity.model';

@Component({
	selector: 'app-destination',
	imports: [ActivityComponent, MatIconModule, DragDropModule, CdkDropList, CdkDrag],
	templateUrl: './destination.component.html',
	styleUrl: './destination.component.scss'
})
export class DestinationComponent implements OnInit {
	@Input() destination: Destination | undefined;

	sortedActivities: Activity[] = [];

	constructor(private activityService: ActivityService) { }

	ngOnInit(): void {
		this.sortedActivities = this.destination?.activities
			.sort((a, b) => a.sortOrder - b.sortOrder) ?? [];
	}

	drop(event: any) {
		if (!this.destination) return;

		swapSortOrder(this.sortedActivities, event.previousIndex, event.currentIndex);
		var activities = [this.sortedActivities[event.previousIndex], this.sortedActivities[event.currentIndex]];
		moveItemInArray(this.sortedActivities, event.previousIndex, event.currentIndex);

		this.activityService.updateActivities(activities)
			.subscribe(
				(response) => {
				}
			);

		// this.activityService.update(this.destination.activities[event.previousIndex]).subscribe();
		// this.activityService.update(this.destination.activities[event.currentIndex]).subscribe();
	}

	getDestinationTypeIcon() {
		if (this.destination) {
			switch (this.destination.destinationTypeCd) {
				case (DestinationType.START): return "home";
				case (DestinationType.END): return "home";
			}
		}
		return "label";//"explore"
	}
}

import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

export interface SharedHike {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    distance: number;
    duration: number;
    elevationGain: number;
    difficulty: string;
    imageUrl: string;
}

const TEMP_DATA: SharedHike[] = [
    {
        id: '1',
        name: 'Hike 1',
        description: 'Description of Hike 1',
        date: '2023-01-01',
        location: 'Location 1',
        distance: 10,
        duration: 5,
        elevationGain: 500,
        difficulty: 'Moderate',
        imageUrl: 'https://via.placeholder.com/150'
    }
]

@Component({
    selector: 'app-shared-hikes',
    templateUrl: './shared-hikes.component.html',
    styleUrl: './shared-hikes.component.scss',
    imports: [MatButtonModule, MatTableModule, MatMenuModule, MatIconModule],
})
export class SharedHikesComponent {
    @ViewChild(MatTable) table!: MatTable<SharedHike>;
    displayedColumns: string[] = ['open','name', 'description', 'date', 'location', 'distance', 'duration', 'elevationGain', 'difficulty', 'select'];
    dataSource = [...TEMP_DATA];

    constructor(private router: Router) { }

    addHike() {

    }

    removeHike() {

    }

    onOpenHike(hike: SharedHike) {
        this.router.navigate([`shared-hikes/${hike.id}`]);
    }

    onEditHike(hike: SharedHike) {
        alert(`Edit hike: ${hike.name}`);
    }

    onShareHike(hike: SharedHike) {
        alert(`Share hike: ${hike.name}`);
    }
}

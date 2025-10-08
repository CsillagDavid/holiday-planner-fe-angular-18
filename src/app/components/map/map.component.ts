import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
	selector: 'app-map',
	imports: [],
	templateUrl: './map.component.html',
	styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
	private map!: L.Map;

	ngAfterViewInit(): void {
		this.initMap();
	}

	private initMap(): void {
		var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		});

		var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
		});

		this.map = L.map('map').setView([47.083, 19.611], 7);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(this.map);

		var baseMaps = {
			"OpenStreetMap": osm,
			"OpenStreetMap.HOT": osmHOT
		};

		L.control.layers(baseMaps).addTo(this.map);
	}
}
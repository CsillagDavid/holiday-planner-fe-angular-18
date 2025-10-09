import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-gpx';

@Component({
	selector: 'app-map',
	imports: [],
	templateUrl: './map.component.html',
	styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
	private map!: L.Map;
	private ZOOM_THRESHOLD = 10;
	private gpxLayers: L.GPX[] = [];
	private boundsGroup = L.featureGroup();

	constructor(private http: HttpClient) { }

	ngAfterViewInit(): void {
		this.initMap();
	}

	private initMap(): void {
		(window as any).L = L; // hogy a leaflet-gpx is lássa

		// FONTOS: a default ikon elérési utak átírása
		delete (L.Icon.Default.prototype as any)._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: 'marker-icon.png',
			iconUrl: 'marker-icon.png',
			iconSize: {
				x: 40,
				y: 40
			},
			iconAnchor: {
				x: 20,
				y: 40
			},
			tooltipAnchor: {
				x: 20
			},
			shadowUrl: ''
		});

		var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
		});

		var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
		});

		var freeMapSk = L.tileLayer('https://outdoor.tiles.freemap.sk/{z}/{x}/{y}', {
			maxZoom: 19,
		});

		var baseMaps = {
			"OpenStreetMap": osm,
			"OpenStreetMap.HOT": osmHOT,
			"freemap.sk": freeMapSk
		};

		this.map = L.map('map', {
			layers: [osm]
		}).setView([47.083, 19.611], 7);

		var hikingTrails = L.tileLayer('https://tile.waymarkedtrails.org/{id}/{z}/{x}/{y}.png', {
			id: 'hiking',
			attribution: '&copy; <a href="http://waymarkedtrails.org">Sarah Hoffmann</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
		});
		var cyclingTrails = L.tileLayer('https://tile.waymarkedtrails.org/{id}/{z}/{x}/{y}.png', {
			id: 'cycling',
			attribution: '&copy; <a href="http://waymarkedtrails.org">Sarah Hoffmann</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
		});

		var overlays = {
			"hiking": hikingTrails,
			"cycling": cyclingTrails
		};

		var controls = L.control.layers(baseMaps, overlays, { collapsed: true }).addTo(this.map);
		L.control.scale({
			metric: true
		}).addTo(this.map);
		// control.addOverlay(HikingTrails, "Hiking Routes");
		// control.addOverlay(CyclingTrails, "Cycling Routes");

		// var url = "Bakonyi Barangolás 20 öbt.gpx";

		// this.http.get("https://localhost:44375/api/attachment/gpx/1", { responseType: 'blob' })
		// 	.subscribe(blob => {
		// 		const url = URL.createObjectURL(blob);
		// 		this.addGpx(url);
		// 	});

		this.http.get("https://localhost:44375/api/attachment/allToDisplay", { responseType: 'json' })
			.subscribe(res => {
				(res as any[]).forEach(gpxString => {
					const parser = new DOMParser();
					const xmlDoc = parser.parseFromString(gpxString, 'application/xml');
					this.addGpx(gpxString);
				});

				this.map.fitBounds(this.boundsGroup.getBounds());

				// this.map.on('zoomend', () => {
				// 	const show = this.map.getZoom() >= this.ZOOM_THRESHOLD;
				// 	console.log(show);
				// 	this.gpxLayers.forEach(gpx => {
				// 		gpx.getLayers().forEach((layer: any) => {
				// 			console.log(layer._layers);
				// 			// if (layer instanceof L.Marker) {
				// 			// 	const iconEl = layer.getElement();
				// 			// 	console.log(iconEl);
				// 			// 	if (iconEl) {
				// 			// 		iconEl.style.display = show ? '' : 'none';
				// 			// 	}
				// 			// }
				// 		});
				// 	});
				// });
			});
	}

	addGpx(url: any) {
		const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
		var colorOptions = { color: randomColor, opacity: 1 } as L.PolylineOptions;
		var gpx = new L.GPX(url, {
			async: true,
			marker_options: {
				startIcon: undefined,
				endIcon: undefined,
				shadowUrl: ''
			},
			polyline_options: colorOptions,
		}).on('addpoint', function (e) {
			// console.log('Added ', e);
		}).on('loaded', (e: any) => {
			console.log(e);
			this.boundsGroup.addLayer(gpx);
			// this.map.fitBounds(e.target.getBounds());
		}).on('error', function (e) {
			console.log('Error loading file: ', e);
		}).on('mouseup', (e: any) => {
			this.map.fitBounds(e.target.getBounds());
		}).addTo(this.map);

		this.gpxLayers.push(gpx);

		// setTimeout(() => {
		// 	colorOptions.color = 'blue';
		// 	// gpx.setStyle({color: 'blue'})
		// 	gpx.reload();
		// 	console.log("done");
		// }, 2000);

		// const gpx = new L.GPX("edk_2025_teljes.gpx", {
		// 	async: true
		// })
		// .on('loaded', (e: any) => {
		// 	this.map.fitBounds(e.target.getBounds());
		// })
		// .addTo(this.map);
	}
}
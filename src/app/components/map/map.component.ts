import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, NgZone } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-gpx';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgClass, NgIf } from '@angular/common';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface MapLayerNode {
	name: string;
	children?: MapLayerNode[];
}

/** Flat node with expandable and level information */
interface FlatNode {
	expandable: boolean;
	name: string;
	level: number;
}

@Component({
	selector: 'app-map',
	imports: [MatIconModule, MatSidenavModule, NgClass, MatTreeModule],
	templateUrl: './map.component.html',
	styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
	@Input() isSideNavHidden: boolean = false;
	private map!: L.Map;
	private ZOOM_THRESHOLD = 10;
	private gpxLayers: L.GPX[] = [];
	private boundsGroup = L.featureGroup();

	sidenavOpened: boolean = false;

	private _transformer = (node: MapLayerNode, level: number) => {
		return {
			expandable: !!node.children && node.children.length > 0,
			name: node.name,
			level: level,
		};
	};

	treeControl = new FlatTreeControl<FlatNode>(
		node => node.level,
		node => node.expandable,
	);

	treeFlattener = new MatTreeFlattener(
		this._transformer,
		node => node.level,
		node => node.expandable,
		node => node.children,
	);

	dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

	constructor(private http: HttpClient,
		private ngZone: NgZone
	) {
		this.dataSource.data = EXAMPLE_DATA;
	}

	hasChild = (_: number, node: FlatNode) => node.expandable;


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
				x: 0,
				y: 0
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
		
		var bergfex = L.tileLayer('https://tiles.bergfex.at/styles/bergfex-osm/{z}/{x}/{y}.jpg', {
			maxZoom: 19,
		});

		var openHiking = L.tileLayer('https://maps.refuges.info/hiking/{z}/{x}/{y}.png', {
			maxZoom: 19,
		});

		var baseMaps = {
			"OpenStreetMap": osm,
			"OpenStreetMap.HOT": osmHOT,
			"freemap.sk": freeMapSk,
			"bergfex": bergfex,
			"openHiking": openHiking,
		};

		this.map = L.map('map', {
			layers: [osm],
			renderer: L.canvas()
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

		var url = "Bakonyi Barangolás 20 öbt.gpx";

		// this.http.get("https://localhost:44375/api/attachment/gpx/1", { responseType: 'blob' })
		// 	.subscribe(blob => {
		// 		const url = URL.createObjectURL(blob);
		// 		this.addGpx(url);
		// 	});

		this.ngZone.runOutsideAngular(() => {
			this.http.get("https://localhost:44375/api/attachment/allToDisplay", { responseType: 'json' })
				.subscribe(res => {
					this.addGpxFiles(res as string[]);
					// .subscribe(res => {
					// 	(res as any[]).forEach(gpxString => {
					// 		// const parser = new DOMParser();
					// 		// const xmlDoc = parser.parseFromString(gpxString, 'application/xml');
					// 		this.addGpx(gpxString);
					// 		// this.map.fitBounds(this.boundsGroup.getBounds());
					// 	});

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
		});
	}

	addGpxFiles(urls: string[]) {
		const group = L.featureGroup();
		urls.forEach(url => {
			const layer = this.getGpxItem(url);
			group.addLayer(layer);
		});
		group.addTo(this.map);
	}

	getGpxItem(url: string): L.GPX {
		const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
		var colorOptions = { color: randomColor, opacity: 1 } as L.PolylineOptions;
		var gpx = new L.GPX(url, {
			async: false,
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
			// this.boundsGroup.addLayer(gpx);
			// this.map.fitBounds(e.target.getBounds());
		}).on('error', function (e) {
			console.log('Error loading file: ', e);
		}).on('mouseup', (e: any) => {
			this.map.fitBounds(e.target.getBounds());
		});
		return gpx;
	}

	addGpx(url: any) {
		var gpx = this.getGpxItem(url).addTo(this.map);

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

	onSidenavButtonClicked() {
		this.sidenavOpened = !this.sidenavOpened;
	}
}

const EXAMPLE_DATA: MapLayerNode[] = [
	{
		name: 'Markers',
		children: [{
			name: 'Öreg Bakony Bakancsosa'
		},
		{
			name: 'Várak a Magas Bakonyban'
		}],
	},
	{
		name: 'Routes',
		children: [
			{
				name: 'OKT',
				children: [{
					name: 'OKT 8. szakasz',
					children: [{ name: 'Kőris-hegy - Zirc' }]
				}],
			}
		],
	},
];
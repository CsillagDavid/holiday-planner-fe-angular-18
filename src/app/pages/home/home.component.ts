import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: 'app-home',
	imports: [MatIconModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	fileName = '';

	constructor(private http: HttpClient) {
		}

	onFileSelected(event: any) {

		const file: File = event.target.files[0];

		if (file) {

			this.fileName = file.name;

			const formData = new FormData();

			formData.append("thumbnail", file);

			const upload$ = this.http.post("https://localhost:44375/api/attachment", formData);

			upload$.subscribe();
		}
	}

	getAll() {
		this.http.get("https://localhost:44375/api/attachment/all", {
		}).subscribe((res: any) => {
			const byteCharacters = atob(res[0].fileContents);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			var blob = new Blob([byteArray]);
			// const blob = res.body as Blob;
			// console.log(res, blob);
			// fájlnév a response headerből (Content-Disposition)
			// const contentDisposition = res.headers.get('Content-Disposition');
			let fileName = res[0].fileDownloadName;
			// if (contentDisposition) {
			// 	const match = /filename="?(.+)"?/.exec(contentDisposition);
			// 	if (match != null && match[1]) {
			// 		fileName = match[1];
			// 	}
			// }

			// letöltés indítása böngészőben
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = fileName;
			a.click();
			window.URL.revokeObjectURL(url);
		});
	}

	getGpsFile(id: number) {
		this.http.get("https://localhost:44375/api/attachment/gpx/" + id).subscribe(res => {
			console.log(res);
		});
	}
}

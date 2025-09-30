import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	providers: [],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	constructor(private authService: AuthService) {
		console.log("this.authService.checkAuth()");
		this.authService.checkAuth();
	}
}

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { PlanService } from '../../services/plan.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
	selector: 'app-login',
	imports: [MatCardModule,
		MatButtonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
	hide = signal(true);
	loginFormGroup: FormGroup;

	constructor(private authService: AuthService,
		private planService: PlanService,
		private router: Router,
		private snackBar: MatSnackBar) {
		this.loginFormGroup = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		});
		// matcher = new MyErrorStateMatcher();
	}

	passwordShowHide(event: MouseEvent) {
		this.hide.set(!this.hide());
		event.stopPropagation();
	}

	onLogin() {
		this.authService.loginWithCookie({ username: "dcsillag", password: "P@ss11wd" }).subscribe({
		// this.authService.loginWithCookie({ username: this.loginFormGroup.get('email')?.value, password: this.loginFormGroup.get('password')?.value }).subscribe({
			next: () => {
				this.router.navigate(['/']); // Sikeres login → home
			},
			error: () => {
				this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
					duration: 3000,
				});
			}
		});
	}

	onGetPlans() {
		this.planService.getPlans().subscribe(
			response => console.log(response),
			error => console.log(error)
		);
	}
}

export class LoginErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}
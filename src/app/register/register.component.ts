import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';
import { AccountService } from './../_services/account.service';

interface RegistrationModel {
	username: string;
	password: string;
	confirmPassword: string;
}

interface RegistrationSubmission {
	username: string;
	password: string;
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	@Output() cancelRegister = new EventEmitter();
	model: any = {};
	passwordsMatch = { formSubmitted: false, passwordsSame: false };

	registerForm = this.fb.group({
		username: ['', [Validators.required, Validators.minLength(3)]],
		password: ['', [Validators.required, Validators.minLength(5)]],
		confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
	});

	constructor(private accountService: AccountService, private fb: FormBuilder) {}

	ngOnInit(): void {}

	// tslint:disable-next-line: typedef
	get username() {
		return this.registerForm.get('username');
	}
	// tslint:disable-next-line: typedef
	get password() {
		return this.registerForm.get('password');
	}
	// tslint:disable-next-line: typedef
	get confirmPassword() {
		return this.registerForm.get('confirmPassword');
	}

	register(): void {
		this.passwordsMatch.formSubmitted = false;
		this.passwordsMatch.passwordsSame = false;
		if (this.checkPasswords()) {
			const registerObj: RegistrationSubmission = {
				username: this.registerForm.value.username,
				password: this.registerForm.value.password,
			};
			this.accountService.register(registerObj).subscribe(
				(response) => {
					this.passwordsMatch.formSubmitted = false;
					this.passwordsMatch.passwordsSame = false;
					this.cancel();
				},

				(err) => {
					console.error('Register Error: ', err);
				}
			);
		} else {
		}
	}

	cancel(): void {
		this.cancelRegister.emit(false);
	}

	checkPasswords(): boolean {
		this.passwordsMatch.formSubmitted = true;
		const password = this.registerForm.get('password')?.value;
		const confirmPassword = this.registerForm.get('confirmPassword')?.value;

		const same = password === confirmPassword ? true : false;
		this.passwordsMatch.passwordsSame = same;
		return same;
	}
}

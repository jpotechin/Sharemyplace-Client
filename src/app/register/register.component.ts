import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface RegistrationModel {
	username: string;
	password: string;
	confirmPassword: string;
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	@Input() usersList: any;
	@Output() cancelRegister = new EventEmitter();
	model: any = {};

	constructor() {}

	ngOnInit(): void {
		console.log('user list', this.usersList);
	}

	register(): void {
		console.log(this.model);
		const passwordMatch = this.confirmPasswordMatch();
		if (passwordMatch) {
			console.log('Password matches');
		} else {
			console.log('Password Does not match');
		}
	}

	cancel(): void {
		this.cancelRegister.emit(false);
	}

	confirmPasswordMatch(): boolean {
		if (this.model && this.model.password && this.model.confirmPassword) {
			const { password, confirmPassword } = this.model;
			return password === confirmPassword ? true : false;
		} else {
			return false;
		}
	}
}

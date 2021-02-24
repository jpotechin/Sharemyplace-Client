import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services/account.service';
import { IUser } from './interface/account.interface';

interface IUsers {
	id: number;
	userName: string;
}
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'Share My Place';
	users: IUsers[] | [];

	constructor(private accountService: AccountService) {
		this.users = [];
	}

	ngOnInit(): void {
		this.setCurrentUser();
	}

	setCurrentUser(): void {
		const userJson = localStorage.getItem('user');
		const user: IUser | null = userJson !== null ? JSON.parse(userJson) : null;
		this.accountService.setCurrentUser(user);
	}
}

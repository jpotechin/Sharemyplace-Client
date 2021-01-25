import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services/account.service';
import { User } from './interface/account.interface';

interface Users {
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
	users: Users[] | [];

	constructor(private accountService: AccountService) {
		this.users = [];
	}

	ngOnInit(): void {
		this.setCurrentUser();
	}

	setCurrentUser(): void {
		const userJson = localStorage.getItem('user');
		const user: User | null = userJson !== null ? JSON.parse(userJson) : null;
		this.accountService.setCurrentUser(user);
	}
}

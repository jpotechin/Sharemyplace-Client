import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	registerMode = false;
	users: any;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.getUsers();
	}

	registerToggle(): void {
		this.registerMode = !this.registerMode;
	}

	registerCancle(event: boolean): void {
		this.registerMode = event;
	}

	getUsers(): void {
		const url = 'https://localhost:5001/api/users';
		this.http.get(url).subscribe((users) => (this.users = users));
	}
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

	constructor(private http: HttpClient) {
		this.users = [];
	}

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers(): void {
		this.http.get('https://localhost:5001/api/users').subscribe(
			(response: any) => {
				this.users = response;
			},
			(error) => console.error(error)
		);
	}
}

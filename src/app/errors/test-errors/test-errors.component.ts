import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-test-errors',
	templateUrl: './test-errors.component.html',
	styleUrls: ['./test-errors.component.scss'],
})
export class TestErrorsComponent implements OnInit {
	baseUrl = 'https://localhost:5001/api/';

	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	get404Error(): void {
		this.http.get(this.baseUrl + 'buggy/not-found').subscribe(
			(response) => {
				console.log(response);
			},
			(err) => {
				console.error(err);
			}
		);
	}

	get400Error(): void {
		this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(
			(response) => {
				console.log(response);
			},
			(err) => {
				console.error(err);
			}
		);
	}

	get500Error(): void {
		this.http.get(this.baseUrl + 'buggy/server-error').subscribe(
			(response) => {
				console.log(response);
			},
			(err) => {
				console.error(err);
			}
		);
	}

	get401Error(): void {
		this.http.get(this.baseUrl + 'buggy/auth').subscribe(
			(response) => {
				console.log(response);
			},
			(err) => {
				console.error(err);
			}
		);
	}

	get400ValidationError(): void {
		this.http.post(this.baseUrl + 'account/register', {}).subscribe(
			(response) => {
				console.log(response);
			},
			(err) => {
				console.error(err);
			}
		);
	}
}

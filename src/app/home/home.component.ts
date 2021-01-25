import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	registerMode = false;
	users: any;

	constructor() {}

	ngOnInit(): void {}

	registerToggle(): void {
		this.registerMode = !this.registerMode;
	}

	registerCancle(event: boolean): void {
		this.registerMode = event;
	}
}

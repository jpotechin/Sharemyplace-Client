import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { LoggedInReponse } from '../interface/account.interface';
import { AccountService } from './../_services/account.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	model: any = {};
	loggedIn = false;
	showOptionsMenu = false;

	constructor(private accountService: AccountService) {}

	ngOnInit(): void {}

	login(): void {
		this.accountService.login(this.model).subscribe(
			(response: LoggedInReponse) => {
				console.log(response);
				this.loggedIn = true;
				this.model = {};
			},
			(err) => {
				console.error(err);
			}
		);
	}

	showOptions(): void {
		this.showOptionsMenu = !this.showOptionsMenu;
	}

	logout(): void {
		this.loggedIn = false;
	}
}

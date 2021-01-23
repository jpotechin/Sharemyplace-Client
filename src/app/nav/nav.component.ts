import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { User } from '../interface/account.interface';
import { AccountService } from './../_services/account.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	model: any = {};
	showOptionsMenu = false;

	constructor(public accountService: AccountService) {}

	ngOnInit(): void {}

	login(): void {
		this.accountService.login(this.model).subscribe(
			(response: User) => {
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
		this.showOptionsMenu = false;
		this.accountService.logout();
	}
}

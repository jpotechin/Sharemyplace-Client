import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	currentUser: User | null | undefined;

	constructor(public accountService: AccountService, private router: Router) {}

	ngOnInit(): void {
		this.accountService.currentUser$.subscribe((user) => (this.currentUser = user));
	}

	login(): void {
		this.accountService.login(this.model).subscribe(
			(response: User) => {
				this.model = {};
				this.router.navigateByUrl('/members');
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
		this.router.navigateByUrl('/');
	}
}

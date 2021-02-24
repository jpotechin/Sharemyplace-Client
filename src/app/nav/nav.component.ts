import { isDevMode, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../interface/account.interface';
import { AccountService } from './../_services/account.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	model: any = {};
	showOptionsMenu = false;
	currentUser: IUser | null | undefined;
	isErrorLinksVisible = false;
	devEnv: boolean | undefined;

	constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {
		this.devEnv = isDevMode();
	}

	ngOnInit(): void {
		this.accountService.currentUser$.subscribe((user) => (this.currentUser = user));
	}

	login(): void {
		this.checkIfMisingLoginInfo(this.model);
		this.accountService.login(this.model).subscribe((response: IUser) => {
			this.model = {};
			this.router.navigateByUrl('/members');
		});
	}

	checkIfMisingLoginInfo(loginData: any): void {
		if (Object.keys(loginData).length === 0) {
			this.toastr.error('Need username & password');
		} else if (Object.keys(loginData).length < 2) {
			const fieldName = Object.keys(loginData)[0];
			const missingField = fieldName === 'username' ? 'Password' : 'Username';
			this.toastr.error(`${missingField} is missing. Please try again`);
		} else if (Object.keys(loginData).length === 2) {
			// tslint:disable-next-line: no-unused-expression
			loginData.username === '' ? this.toastr.error('Missing Username') : null;
			// tslint:disable-next-line: no-unused-expression
			loginData.password === '' ? this.toastr.error('Missing Password') : null;
		}
	}

	showOptions(): void {
		this.showOptionsMenu = !this.showOptionsMenu;
	}

	logout(): void {
		this.showOptionsMenu = false;
		this.accountService.logout();
		this.router.navigateByUrl('/');
	}

	showErrorLinks(): void {
		this.isErrorLinksVisible = !this.isErrorLinksVisible;
	}
}
